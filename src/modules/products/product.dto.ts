import { z } from 'zod';

export const productWeightVariantSchema = z.object({
  id: z.string().uuid().optional(),
  weightOptionId: z.string().uuid(),
  price: z.number().positive(),
  stockInGrams: z.number().int().nonnegative().optional(),
  sku: z.string().optional(),
});

export const createProductSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid(),
    name: z.string().min(2),
    nameAr: z.string().min(2).optional(),
    nameEn: z.string().min(2).optional(),
    description: z.string().optional(),
    descriptionAr: z.string().optional(),
    descriptionEn: z.string().optional(),
    unitType: z.enum(['WEIGHT', 'PIECE']),
    pricePerKg: z.number().positive().optional(),
    fixedPrice: z.number().positive().optional(),
    stockInGrams: z.number().int().nonnegative(),
    sku: z.string().min(3),
    thumbnailUrl: z.string().url().optional(),
    brand: z.string().optional(),
    isActive: z.boolean().optional().default(true),
    isFeatured: z.boolean().optional().default(false),
    weightVariants: z.array(productWeightVariantSchema).optional(),
  }).refine((data) => {
    if (data.unitType === 'WEIGHT') return data.pricePerKg !== undefined;
    if (data.unitType === 'PIECE') return data.fixedPrice !== undefined;
    return false;
  }, { message: "Provide pricePerKg for WEIGHT type, or fixedPrice for PIECE type" }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    categoryId: z.string().uuid().optional(),
    name: z.string().min(2).optional(),
    nameAr: z.string().min(2).optional(),
    nameEn: z.string().min(2).optional(),
    description: z.string().optional(),
    descriptionAr: z.string().optional(),
    descriptionEn: z.string().optional(),
    unitType: z.enum(['WEIGHT', 'PIECE']).optional(),
    pricePerKg: z.number().positive().optional(),
    fixedPrice: z.number().positive().optional(),
    stockInGrams: z.number().int().nonnegative().optional(),
    sku: z.string().min(3).optional(),
    thumbnailUrl: z.string().url().optional(),
    brand: z.string().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    weightVariants: z.array(productWeightVariantSchema).optional(),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const productSlugParamSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export const addProductImageSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    url: z.string().url(),
    sortOrder: z.number().int().optional().default(0),
  }),
});

export const deleteProductImageSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
    imgId: z.string().uuid(),
  }),
});

export const productSortEnum = z.enum(['newest', 'price_asc', 'price_desc', 'name']);

export const getAllProductsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    categories: z.string().optional().transform(val => val ? val.split(',') : undefined),
    brand: z.string().optional(),
    brands: z.string().optional().transform(val => val ? val.split(',') : undefined),
    isFeatured: z.enum(['true', 'false']).optional().transform(val => val === 'true'),
    search: z.string().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    sort: productSortEnum.optional().default('newest'),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
  }),
});

export type ProductSort = z.infer<typeof productSortEnum>;
export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type AddProductImageInput = z.infer<typeof addProductImageSchema>['body'];
