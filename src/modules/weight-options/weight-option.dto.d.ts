import { z } from 'zod';
export declare const createWeightOptionSchema: z.ZodObject<{
    body: z.ZodObject<{
        label: z.ZodString;
        valueInGrams: z.ZodNumber;
        isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateWeightOptionSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        valueInGrams: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const weightOptionIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateWeightOptionInput = z.infer<typeof createWeightOptionSchema>['body'];
export type UpdateWeightOptionInput = z.infer<typeof updateWeightOptionSchema>['body'];
//# sourceMappingURL=weight-option.dto.d.ts.map