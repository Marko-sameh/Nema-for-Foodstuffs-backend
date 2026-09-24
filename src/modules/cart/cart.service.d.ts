import { AddToCartInput, UpdateCartItemInput } from './cart.dto';
export declare class CartService {
    private repository;
    getCart(userId?: string, sessionId?: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                stock_in_grams: number;
                thumbnail_url: string | null;
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
    addItem(data: AddToCartInput, userId?: string, sessionId?: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                stock_in_grams: number;
                thumbnail_url: string | null;
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
    updateItemQuantity(itemId: string, data: UpdateCartItemInput, userId?: string, sessionId?: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                stock_in_grams: number;
                thumbnail_url: string | null;
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
    removeItem(itemId: string, userId?: string, sessionId?: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                stock_in_grams: number;
                thumbnail_url: string | null;
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
    clearCart(userId?: string, sessionId?: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                stock_in_grams: number;
                thumbnail_url: string | null;
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
    computeCartSubtotal(userId?: string, sessionId?: string): Promise<number>;
    mergeGuestCart(sessionId: string, userId: string): Promise<void>;
}
//# sourceMappingURL=cart.service.d.ts.map