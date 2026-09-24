export declare class PaymentService {
    private repository;
    initiatePayment(orderId: string, userId: string): Promise<{
        message: string;
        payment: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatusType;
            order_id: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            provider_transaction_id: string | null;
            amount: number;
            paid_at: Date | null;
        };
        orderId?: undefined;
    } | {
        message: string;
        orderId: string;
        payment?: undefined;
    }>;
    getOrderPayments(orderId: string, userId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.PaymentStatusType;
        order_id: string;
        provider: import("@prisma/client").$Enums.PaymentProvider;
        provider_transaction_id: string | null;
        amount: number;
        paid_at: Date | null;
    }[]>;
}
//# sourceMappingURL=payment.service.d.ts.map