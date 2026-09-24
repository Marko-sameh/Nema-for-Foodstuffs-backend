import { PaymentProvider, PaymentStatusType } from '@prisma/client';
export interface PaymentRecord {
    id: string;
    order_id: string;
    provider: PaymentProvider;
    provider_transaction_id: string | null;
    amount: number;
    status: PaymentStatusType;
    paid_at: Date | null;
}
export interface InitiatePaymentResult {
    message: string;
    payment?: PaymentRecord;
    orderId?: string;
}
//# sourceMappingURL=payment.types.d.ts.map