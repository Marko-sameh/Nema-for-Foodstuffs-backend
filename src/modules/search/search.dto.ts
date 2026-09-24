import { z } from 'zod';

export const searchSchema = z.object({
  query: z.object({
    q: z.string().min(2),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
  }),
});

export type SearchQueryInput = z.infer<typeof searchSchema>['query'];
