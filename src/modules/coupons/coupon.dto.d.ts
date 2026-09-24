import { z } from 'zod';
export declare const createCouponSchema: z.ZodObject<{
    body: z.ZodObject<{
        code: z.ZodString;
        type: z.ZodEnum<{
            PERCENTAGE: "PERCENTAGE";
            FIXED: "FIXED";
        }>;
        value: z.ZodNumber;
        minOrderAmount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxUses: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        expiresAt: z.ZodString;
        isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCouponSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        code: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<{
            PERCENTAGE: "PERCENTAGE";
            FIXED: "FIXED";
        }>>;
        value: z.ZodOptional<z.ZodNumber>;
        minOrderAmount: z.ZodOptional<z.ZodNumber>;
        maxUses: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        expiresAt: z.ZodOptional<z.ZodString>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const validateCouponSchema: z.ZodObject<{
    body: z.ZodObject<{
        code: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const couponIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateCouponInput = z.infer<typeof createCouponSchema>['body'];
export type UpdateCouponInput = z.infer<typeof updateCouponSchema>['body'];
export type ValidateCouponInput = z.infer<typeof validateCouponSchema>['body'];
//# sourceMappingURL=coupon.dto.d.ts.map