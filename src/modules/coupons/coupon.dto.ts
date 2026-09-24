import { z } from 'zod';

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3).toUpperCase(),
    type: z.enum(['PERCENTAGE', 'FIXED']),
    value: z.number().positive(),
    minOrderAmount: z.number().nonnegative().optional().default(0),
    maxUses: z.number().int().positive().nullable().optional(),
    expiresAt: z.string().datetime(), // ISO string
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateCouponSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    code: z.string().min(3).toUpperCase().optional(),
    type: z.enum(['PERCENTAGE', 'FIXED']).optional(),
    value: z.number().positive().optional(),
    minOrderAmount: z.number().nonnegative().optional(),
    maxUses: z.number().int().positive().nullable().optional(),
    expiresAt: z.string().datetime().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z.string().toUpperCase(),
  }),
});

export const couponIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateCouponInput = z.infer<typeof createCouponSchema>['body'];
export type UpdateCouponInput = z.infer<typeof updateCouponSchema>['body'];
export type ValidateCouponInput = z.infer<typeof validateCouponSchema>['body'];
