import { z } from 'zod';
export declare const initiatePaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        orderId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const orderIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=payment.dto.d.ts.map