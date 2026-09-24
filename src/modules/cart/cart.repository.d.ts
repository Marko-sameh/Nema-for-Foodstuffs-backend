export declare class CartRepository {
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
    createCart(userId?: string, sessionId?: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string | null;
        session_id: string | null;
    }>;
    getOrCreateCart(userId?: string, sessionId?: string): Promise<({
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
    findCartItem(cartId: string, productId: string, weightVariantId?: string): Promise<{
        id: string;
        product_id: string;
        cart_id: string;
        weight_variant_id: string | null;
        quantity: number;
        price_snapshot: number;
        weight_snapshot_grams: number | null;
    } | null>;
    addCartItem(data: {
        cartId: string;
        productId: string;
        weightVariantId?: string;
        quantity: number;
        priceSnapshot: number;
        weightSnapshotGrams?: number;
    }): Promise<{
        id: string;
        product_id: string;
        cart_id: string;
        weight_variant_id: string | null;
        quantity: number;
        price_snapshot: number;
        weight_snapshot_grams: number | null;
    }>;
    updateCartItemQuantity(itemId: string, quantity: number): Promise<{
        id: string;
        product_id: string;
        cart_id: string;
        weight_variant_id: string | null;
        quantity: number;
        price_snapshot: number;
        weight_snapshot_grams: number | null;
    }>;
    removeCartItem(itemId: string): Promise<{
        id: string;
        product_id: string;
        cart_id: string;
        weight_variant_id: string | null;
        quantity: number;
        price_snapshot: number;
        weight_snapshot_grams: number | null;
    }>;
    clearCart(cartId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    assignCartToUser(cartId: string, userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string | null;
        session_id: string | null;
    }>;
    moveItemToCart(itemId: string, targetCartId: string): Promise<{
        id: string;
        product_id: string;
        cart_id: string;
        weight_variant_id: string | null;
        quantity: number;
        price_snapshot: number;
        weight_snapshot_grams: number | null;
    }>;
    deleteCart(cartId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string | null;
        session_id: string | null;
    }>;
    getProductAndVariant(productId: string, weightVariantId?: string): Promise<{
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
    } | null>;
}
//# sourceMappingURL=cart.repository.d.ts.map