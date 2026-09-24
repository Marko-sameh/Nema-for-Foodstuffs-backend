import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    addressId: z.string(),
    paymentMethod: z.enum(['COD', 'CARD', 'WALLET']),
    notes: z.string().optional(),
    couponCode: z.string().optional(),
    idempotencyKey: z.string().optional(),
    items: z.array(z.object({
      productId: z.string().uuid(),
      variantId: z.string().uuid().optional().nullable(),
      quantity: z.number().int().positive(),
    })).min(1, 'Cart is empty'),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
    paymentStatus: z.enum(['UNPAID', 'PAID', 'REFUNDED']).optional(),
    note: z.string().optional(),
  }),
});

export const orderIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).max(100000).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>['body'];
export type PaginationQuery = z.infer<typeof paginationQuerySchema>['query'];
