import { z } from 'zod';
export declare const updateSettingsSchema: z.ZodObject<{
    body: z.ZodObject<{
        shipping_fee: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>['body'];
//# sourceMappingURL=settings.dto.d.ts.map