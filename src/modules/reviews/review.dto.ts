import { z } from 'zod';

export const createReviewSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});

export const adminApproveReviewSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    isApproved: z.boolean(),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
});

export const reviewIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>['body'];
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>['body'];
