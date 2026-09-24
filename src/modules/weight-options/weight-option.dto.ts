import { z } from 'zod';

export const createWeightOptionSchema = z.object({
  body: z.object({
    label: z.string().min(2), // e.g., "ربع كيلو"
    valueInGrams: z.number().int().positive(), // e.g., 250
    isActive: z.boolean().optional().default(true),
  }),
});

export const updateWeightOptionSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    label: z.string().min(2).optional(),
    valueInGrams: z.number().int().positive().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const weightOptionIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateWeightOptionInput = z.infer<typeof createWeightOptionSchema>['body'];
export type UpdateWeightOptionInput = z.infer<typeof updateWeightOptionSchema>['body'];
