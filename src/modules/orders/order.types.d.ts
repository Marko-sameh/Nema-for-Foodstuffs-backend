import { OrderStatus, PaymentStatus, PaymentMethod } from '@prisma/client';
export interface OrderItemSnapshot {
    product_id: string;
    product_name_snapshot: string;
    weight_label_snapshot: string | null;
    weight_grams_snapshot: number | null;
    quantity: number;
    unit_price: number;
    total_price: number;
}
export interface OrderSummary {
    id: string;
    status: OrderStatus;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
    subtotal: number;
    shipping_fee: number;
    discount: number;
    total: number;
    created_at: Date;
}
//# sourceMappingURL=order.types.d.ts.map