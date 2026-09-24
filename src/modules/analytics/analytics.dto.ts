import { z } from 'zod';

export const getSalesSchema = z.object({
  query: z.object({
    period: z.enum(['daily', 'monthly']).optional().default('daily'),
  }),
});

export const getTopProductsSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(50).optional().default(5),
  }),
});
