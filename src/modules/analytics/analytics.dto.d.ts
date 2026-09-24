import { z } from 'zod';
export declare const getSalesSchema: z.ZodObject<{
    query: z.ZodObject<{
        period: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            daily: "daily";
            monthly: "monthly";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getTopProductsSchema: z.ZodObject<{
    query: z.ZodObject<{
        limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=analytics.dto.d.ts.map