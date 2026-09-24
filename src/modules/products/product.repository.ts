import { prisma } from '../../config/db';
import { CreateProductInput, UpdateProductInput, AddProductImageInput, ProductSort } from './product.dto';
import { buildProductSearchText, normalizeSearchText } from '../search/arabic';

function sortToOrderBy(sort?: ProductSort) {
  switch (sort) {
    case 'price_asc':
      // Sort by whichever price field is set; Prisma cannot coalesce in orderBy,
      // so we approximate with fixed_price then price_per_kg as secondary tie-break.
      return [{ fixed_price: 'asc' as const }, { price_per_kg: 'asc' as const }];
    case 'price_desc':
      return [{ fixed_price: 'desc' as const }, { price_per_kg: 'desc' as const }];
    case 'name':
      return [{ name: 'asc' as const }];
    case 'newest':
    default:
      return [{ created_at: 'desc' as const }];
  }
}

export class ProductRepository {
  async findAll(query: any) {
    const { category, categories, brand, brands, isFeatured, search, minPrice, maxPrice, sort } = query;
    const where: any = { is_active: true };

    if (category) where.category_id = category;
    if (categories && Array.isArray(categories)) {
      where.category = { slug: { in: categories } };
    }

    if (brand) where.brand = brand;
    if (brands && Array.isArray(brands)) {
      where.brand = { in: brands };
    }

    if (isFeatured) where.is_featured = isFeatured === 'true';
    if (search) {
      const normalized = normalizeSearchText(search);
      where.search_text = { contains: normalized, mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.OR = [
        {
          fixed_price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        },
        {
          price_per_kg: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { name: true, name_ar: true, name_en: true, slug: true } },
          weight_variants: { include: { weight_option: true } },
        },
        orderBy: sortToOrderBy(sort),
        skip: query.skip,
        take: query.take,
      }),
      prisma.product.count({ where }),
    ]);

    return { data, total };
  }

  async findBySlug(slug: string, includeInactive: boolean) {
    return prisma.product.findUnique({
      where: { slug, ...(includeInactive ? {} : { is_active: true }) },
      include: {
        category: true,
        images: { orderBy: { sort_order: 'asc' } },
        weight_variants: { include: { weight_option: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { weight_variants: true },
    });
  }

  async findImageForProduct(productId: string, imgId: string) {
    return prisma.productImage.findFirst({ where: { id: imgId, product_id: productId } });
  }

  async countOrderItemsForProduct(productId: string) {
    return prisma.orderItem.count({ where: { product_id: productId } });
  }

  async create(data: CreateProductInput, slug: string) {
    return prisma.$transaction(async (tx: any) => {
      const search_text = buildProductSearchText({
        name: data.name,
        name_ar: data.nameAr,
        name_en: data.nameEn,
        brand: data.brand,
        description: data.description,
      });

      const product = await tx.product.create({
        data: {
          category_id: data.categoryId,
          name: data.name,
          name_ar: data.nameAr,
          name_en: data.nameEn,
          slug,
          description: data.description,
          description_ar: data.descriptionAr,
          description_en: data.descriptionEn,
          unit_type: data.unitType,
          price_per_kg: data.pricePerKg,
          fixed_price: data.fixedPrice,
          stock_in_grams: data.stockInGrams,
          sku: data.sku,
          thumbnail_url: data.thumbnailUrl,
          brand: data.brand,
          is_active: data.isActive,
          is_featured: data.isFeatured,
          search_text,
        },
      });

      if (data.unitType === 'WEIGHT' && data.weightVariants?.length) {
        await tx.productWeightVariant.createMany({
          data: data.weightVariants.map((v) => ({
            product_id: product.id,
            weight_option_id: v.weightOptionId,
            price: v.price,
            stock_in_grams: v.stockInGrams,
            sku: v.sku,
          })),
        });
      }

      return product;
    });
  }

  async update(id: string, data: UpdateProductInput, newSlug?: string) {
    return prisma.$transaction(async (tx: any) => {
      const existing = await tx.product.findUnique({ where: { id } });

      const search_text = buildProductSearchText({
        name: data.name ?? existing?.name,
        name_ar: data.nameAr ?? existing?.name_ar,
        name_en: data.nameEn ?? existing?.name_en,
        brand: data.brand ?? existing?.brand,
        description: data.description ?? existing?.description,
      });

      const product = await tx.product.update({
        where: { id },
        data: {
          category_id: data.categoryId,
          name: data.name,
          name_ar: data.nameAr,
          name_en: data.nameEn,
          ...(newSlug && { slug: newSlug }),
          description: data.description,
          description_ar: data.descriptionAr,
          description_en: data.descriptionEn,
          unit_type: data.unitType,
          price_per_kg: data.pricePerKg,
          fixed_price: data.fixedPrice,
          stock_in_grams: data.stockInGrams,
          sku: data.sku,
          thumbnail_url: data.thumbnailUrl,
          brand: data.brand,
          is_active: data.isActive,
          is_featured: data.isFeatured,
          search_text,
        },
      });

      if (data.weightVariants !== undefined) {
        const existingVariants = await tx.productWeightVariant.findMany({ where: { product_id: id } });
        const incomingIds = data.weightVariants.map((v: any) => v.id).filter(Boolean);

        // Delete variants not in incoming array
        const toDelete = existingVariants.filter((v: any) => !incomingIds.includes(v.id));
        if (toDelete.length > 0) {
          await tx.productWeightVariant.deleteMany({
            where: { id: { in: toDelete.map((v: any) => v.id) } }
          });
        }

        // Upsert variants
        for (const v of data.weightVariants) {
          const variantId = (v as any).id;
          if (variantId) {
            await tx.productWeightVariant.update({
              where: { id: variantId },
              data: { price: v.price, stock_in_grams: v.stockInGrams, sku: v.sku }
            });
          } else {
            await tx.productWeightVariant.create({
              data: { product_id: id, weight_option_id: v.weightOptionId, price: v.price, stock_in_grams: v.stockInGrams, sku: v.sku }
            });
          }
        }
      }

      return product;
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }

  async addImage(productId: string, data: AddProductImageInput) {
    return prisma.productImage.create({
      data: {
        product_id: productId,
        url: data.url,
        sort_order: data.sortOrder,
      },
    });
  }

  async deleteImage(id: string) {
    return prisma.productImage.delete({ where: { id } });
  }
}
