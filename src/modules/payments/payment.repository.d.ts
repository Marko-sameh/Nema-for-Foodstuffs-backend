export declare class PaymentRepository {
    findOrderByIdAndUser(orderId: string, userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        address_id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        payment_status: import("@prisma/client").$Enums.PaymentStatus;
        payment_method: import("@prisma/client").$Enums.PaymentMethod;
        subtotal: number;
        shipping_fee: number;
        discount: number;
        total: number;
        notes: string | null;
        idempotency_key: string | null;
    } | null>;
    createPayment(data: {
        orderId: string;
        provider: 'COD' | 'STRIPE' | 'PAYMOB';
        amount: number;
        status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
        providerTransactionId?: string;
    }): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatusType;
        order_id: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        provider_transaction_id: string | null;
        amount: number;
        paid_at: Date | null;
    }>;
    updateOrderPaymentStatus(orderId: string, status: 'UNPAID' | 'PAID' | 'REFUNDED'): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        address_id: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        payment_status: import("@prisma/client").$Enums.PaymentStatus;
        payment_method: import("@prisma/client").$Enums.PaymentMethod;
        subtotal: number;
        shipping_fee: number;
        discount: number;
        total: number;
        notes: string | null;
        idempotency_key: string | null;
    }>;
    findPaymentsByOrderId(orderId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatusType;
        order_id: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        provider_transaction_id: string | null;
        amount: number;
        paid_at: Date | null;
    }[]>;
}
//# sourceMappingURL=payment.repository.d.ts.map