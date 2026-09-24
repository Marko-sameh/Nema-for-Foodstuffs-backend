import { z } from 'zod';

export const updateSettingsSchema = z.object({
  body: z.object({
    shipping_fee: z.number().min(0).optional(),
    // add more settings here as needed
  }),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>['body'];
