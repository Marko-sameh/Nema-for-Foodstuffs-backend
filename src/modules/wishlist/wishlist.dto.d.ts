import { z } from 'zod';
export declare const addToWishlistSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const removeWishlistItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>['body'];
//# sourceMappingURL=wishlist.dto.d.ts.map