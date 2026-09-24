import { z } from 'zod';
export declare const addToCartSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodString;
        weightVariantId: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCartItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        itemId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        quantity: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const cartItemIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        itemId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type AddToCartInput = z.infer<typeof addToCartSchema>['body'];
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>['body'];
//# sourceMappingURL=cart.dto.d.ts.map