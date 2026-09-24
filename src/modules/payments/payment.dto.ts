import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  body: z.object({ orderId: z.string().uuid() }),
});

export const orderIdParamSchema = z.object({
  params: z.object({ orderId: z.string().uuid() }),
});
