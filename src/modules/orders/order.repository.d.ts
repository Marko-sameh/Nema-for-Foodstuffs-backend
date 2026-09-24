import { UpdateOrderStatusInput } from './order.dto';
export declare class OrderRepository {
    getUserCart(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                created_at: Date;
                updated_at: Date;
                name_ar: string | null;
                name_en: string | null;
                slug: string;
                is_active: boolean;
                category_id: string;
                description: string | null;
                description_ar: string | null;
                description_en: string | null;
                unit_type: import("@prisma/client").$Enums.UnitType;
                price_per_kg: number | null;
                fixed_price: number | null;
                stock_in_grams: number;
                sku: string;
                thumbnail_url: string | null;
                brand: string | null;
                is_featured: boolean;
                search_text: string | null;
            };
            weight_variant: ({
                weight_option: {
                    id: string;
                    label: string;
                    is_active: boolean;
                    value_in_grams: number;
                };
            } & {
                id: string;
                product_id: string;
                stock_in_grams: number | null;
                sku: string | null;
                weight_option_id: string;
                price: number;
            }) | null;
        } & {
            id: string;
            product_id: string;
            cart_id: string;
            weight_variant_id: string | null;
            quantity: number;
            price_snapshot: number;
            weight_snapshot_grams: number | null;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string | null;
        session_id: string | null;
    }) | null>;
    findProductForOrder(productId: string): Promise<({
        weight_variants: ({
            weight_option: {
                id: string;
                label: string;
                is_active: boolean;
                value_in_grams: number;
            };
        } & {
            id: string;
            product_id: string;
            stock_in_grams: number | null;
            sku: string | null;
            weight_option_id: string;
            price: number;
        })[];
    } & {
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string | null;
        name_en: string | null;
        slug: string;
        is_active: boolean;
        category_id: string;
        description: string | null;
        description_ar: string | null;
        description_en: string | null;
        unit_type: import("@prisma/client").$Enums.UnitType;
        price_per_kg: number | null;
        fixed_price: number | null;
        stock_in_grams: number;
        sku: string;
        thumbnail_url: string | null;
        brand: string | null;
        is_featured: boolean;
        search_text: string | null;
    }) | null>;
    findShippingFeeSetting(): Promise<{
        updated_at: Date;
        value: string;
        key: string;
    } | null>;
    findUserAddress(addressId: string, userId: string): Promise<{
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
    } | null>;
    findOrderByIdempotencyKey(userId: string, idempotencyKey: string): Promise<({
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
    }) | null>;
    findCouponByCode(code: string): Promise<{
        id: string;
        expires_at: Date;
        is_active: boolean;
        code: string;
        type: import("@prisma/client").$Enums.CouponType;
        value: number;
        min_order_amount: number;
        max_uses: number | null;
        used_count: number;
    } | null>;
    findCouponUsageByUserAndCoupon(userId: string, couponId: string): Promise<{
        id: string;
        user_id: string;
        coupon_id: string;
        order_id: string;
        used_at: Date;
    } | null>;
    createOrderWithTransaction(userId: string, data: any, items: any[], coupon: {
        id: string;
        type: 'PERCENTAGE' | 'FIXED';
        value: number;
        discount: number;
    } | null): Promise<any>;
    findUserOrders(userId: string, query?: any): Promise<{
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
    }>;
    findOrderById(id: string, userId?: string): Promise<({
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
    }) | null>;
    findAllOrders(query?: any): Promise<{
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
    }>;
    updateOrderStatusWithHistory(id: string, data: UpdateOrderStatusInput, fromStatus: string, changedByUserId?: string): Promise<any>;
    cancelOrderAndRestoreStock(id: string, fromStatus: string, changedByUserId?: string, note?: string): Promise<any>;
}
//# sourceMappingURL=order.repository.d.ts.map