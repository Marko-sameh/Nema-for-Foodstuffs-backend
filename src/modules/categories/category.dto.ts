import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    nameAr: z.string().min(2).optional(),
    nameEn: z.string().min(2).optional(),
    parentId: z.string().uuid().nullable().optional(),
    imageUrl: z.string().url().nullable().optional(),
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    nameAr: z.string().min(2).optional(),
    nameEn: z.string().min(2).optional(),
    parentId: z.string().uuid().nullable().optional(),
    imageUrl: z.string().url().nullable().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const categorySlugParamSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export const getAllCategoriesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
  }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>['body'];
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>['body'];
