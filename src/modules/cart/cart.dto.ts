import { z } from 'zod';

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    weightVariantId: z.string().uuid().optional(),
    quantity: z.number().int().positive(),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    itemId: z.string().uuid(),
  }),
  body: z.object({
    quantity: z.number().int().positive(),
  }),
});

export const cartItemIdParamSchema = z.object({
  params: z.object({
    itemId: z.string().uuid(),
  }),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>['body'];
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>['body'];
