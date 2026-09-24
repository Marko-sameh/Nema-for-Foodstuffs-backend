import { z } from 'zod';
export declare const createAddressSchema: z.ZodObject<{
    body: z.ZodObject<{
        label: z.ZodString;
        fullName: z.ZodString;
        phone: z.ZodString;
        street: z.ZodString;
        city: z.ZodString;
        governorate: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        fullName: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        governorate: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const addressIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>['body'];
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>['body'];
//# sourceMappingURL=address.dto.d.ts.map