import { CreateOrderInput, UpdateOrderStatusInput } from './order.dto';
export declare class OrderService {
    private repository;
    private cartService;
    createOrder(userId: string, data: CreateOrderInput, idempotencyKeyHeader?: string): Promise<any>;
    getUserOrders(userId: string, query: any): Promise<{
        data: ({
            items: {
                id: string;
                product_id: string;
                order_id: string;
                weight_variant_id: string | null;
                quantity: number;
                product_name_snapshot: string;
                weight_label_snapshot: string | null;
                weight_grams_snapshot: number | null;
                unit_price: number;
                total_price: number;
            }[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOrderById(id: string, userId: string): Promise<{
        address: {
            id: string;
            phone: string;
            user_id: string;
            label: string;
            full_name: string;
            street: string;
            city: string;
            governorate: string;
            postal_code: string | null;
            is_default: boolean;
        };
        items: {
            id: string;
            product_id: string;
            order_id: string;
            weight_variant_id: string | null;
            quantity: number;
            product_name_snapshot: string;
            weight_label_snapshot: string | null;
            weight_grams_snapshot: number | null;
            unit_price: number;
            total_price: number;
        }[];
        payments: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatusType;
            order_id: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            provider_transaction_id: string | null;
            amount: number;
            paid_at: Date | null;
        }[];
    } & {
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
    cancelOrder(id: string, userId: string): Promise<any>;
    getAllOrders(query: any): Promise<{
        data: ({
            user: {
                email: string;
                first_name: string;
                last_name: string;
            };
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    adminGetOrderById(id: string): Promise<{
        address: {
            id: string;
            phone: string;
            user_id: string;
            label: string;
            full_name: string;
            street: string;
            city: string;
            governorate: string;
            postal_code: string | null;
            is_default: boolean;
        };
        items: {
            id: string;
            product_id: string;
            order_id: string;
            weight_variant_id: string | null;
            quantity: number;
            product_name_snapshot: string;
            weight_label_snapshot: string | null;
            weight_grams_snapshot: number | null;
            unit_price: number;
            total_price: number;
        }[];
        payments: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatusType;
            order_id: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            provider_transaction_id: string | null;
            amount: number;
            paid_at: Date | null;
        }[];
    } & {
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
    updateOrderStatus(id: string, data: UpdateOrderStatusInput, changedByUserId?: string): Promise<any>;
}
//# sourceMappingURL=order.service.d.ts.map