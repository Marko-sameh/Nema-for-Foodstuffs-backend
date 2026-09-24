import { z } from 'zod';

export const addToWishlistSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
  }),
});

export const removeWishlistItemSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
});

export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>['body'];
