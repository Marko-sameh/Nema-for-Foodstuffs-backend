import { z } from 'zod';

export const createAddressSchema = z.object({
  body: z.object({
    label: z.string().min(1),
    fullName: z.string().min(2),
    phone: z.string().min(5),
    street: z.string().min(3),
    city: z.string().min(2),
    governorate: z.string().min(2),
    postalCode: z.string().optional(),
    isDefault: z.boolean().optional().default(false),
  }),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    label: z.string().min(1).optional(),
    fullName: z.string().min(2).optional(),
    phone: z.string().min(5).optional(),
    street: z.string().min(3).optional(),
    city: z.string().min(2).optional(),
    governorate: z.string().min(2).optional(),
    postalCode: z.string().optional(),
    isDefault: z.boolean().optional(),
  }),
});

export const addressIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>['body'];
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>['body'];
