import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        addressId: z.ZodString;
        paymentMethod: z.ZodEnum<{
            COD: "COD";
            CARD: "CARD";
            WALLET: "WALLET";
        }>;
        notes: z.ZodOptional<z.ZodString>;
        couponCode: z.ZodOptional<z.ZodString>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            variantId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            quantity: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        status: z.ZodEnum<{
            PENDING: "PENDING";
            CONFIRMED: "CONFIRMED";
            PROCESSING: "PROCESSING";
            SHIPPED: "SHIPPED";
            DELIVERED: "DELIVERED";
            CANCELLED: "CANCELLED";
        }>;
        paymentStatus: z.ZodOptional<z.ZodEnum<{
            UNPAID: "UNPAID";
            PAID: "PAID";
            REFUNDED: "REFUNDED";
        }>>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const orderIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const paginationQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>['body'];
export type PaginationQuery = z.infer<typeof paginationQuerySchema>['query'];
//# sourceMappingURL=order.dto.d.ts.map