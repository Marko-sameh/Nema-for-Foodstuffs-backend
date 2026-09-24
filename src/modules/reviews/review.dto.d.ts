import { z } from 'zod';
export declare const createReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        rating: z.ZodOptional<z.ZodNumber>;
        comment: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const adminApproveReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        isApproved: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const productIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const reviewIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>['body'];
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>['body'];
//# sourceMappingURL=review.dto.d.ts.map