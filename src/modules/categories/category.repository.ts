import { prisma } from '../../config/db';
import { CreateCategoryInput, UpdateCategoryInput } from './category.dto';

export class CategoryRepository {
  async findAllTree(query?: any) {
    const { skip, take } = query || {};
    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where: { parent_id: null },
        include: {
          children: {
            include: {
              children: true, // Up to 3 levels deep usually enough
            },
          },
        },
        orderBy: { name: 'asc' },
        skip,
        take,
      }),
      prisma.category.count({ where: { parent_id: null } })
    ]);
    return { data, total };
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: CreateCategoryInput, slug: string) {
    return prisma.category.create({
      data: {
        name: data.name,
        name_ar: data.nameAr,
        name_en: data.nameEn,
        slug,
        parent_id: data.parentId,
        image_url: data.imageUrl,
        is_active: data.isActive,
      },
    });
  }

  async update(id: string, data: UpdateCategoryInput, newSlug?: string) {
    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        name_ar: data.nameAr,
        name_en: data.nameEn,
        ...(newSlug && { slug: newSlug }),
        parent_id: data.parentId,
        image_url: data.imageUrl,
        is_active: data.isActive,
      },
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }

  async countChildren(id: string) {
    return prisma.category.count({ where: { parent_id: id } });
  }

  async countProducts(categoryId: string) {
    return prisma.product.count({ where: { category_id: categoryId } });
  }
}
