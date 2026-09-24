import { z } from 'zod';
export declare const searchSchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodString;
        page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SearchQueryInput = z.infer<typeof searchSchema>['query'];
//# sourceMappingURL=search.dto.d.ts.map