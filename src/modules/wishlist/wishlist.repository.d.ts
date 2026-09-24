export declare class WishlistRepository {
    getWishlist(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                price_per_kg: number | null;
                fixed_price: number | null;
                thumbnail_url: string | null;
            };
        } & {
            id: string;
            product_id: string;
            wishlist_id: string;
            added_at: Date;
        })[];
    } & {
        id: string;
        user_id: string;
    }) | null>;
    createWishlist(userId: string): Promise<{
        id: string;
        user_id: string;
    }>;
    getOrCreateWishlist(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                slug: string;
                unit_type: import("@prisma/client").$Enums.UnitType;
                price_per_kg: number | null;
                fixed_price: number | null;
                thumbnail_url: string | null;
            };
        } & {
            id: string;
            product_id: string;
            wishlist_id: string;
            added_at: Date;
        })[];
    } & {
        id: string;
        user_id: string;
    }) | null>;
    findItem(wishlistId: string, productId: string): Promise<{
        id: string;
        product_id: string;
        wishlist_id: string;
        added_at: Date;
    } | null>;
    addItem(wishlistId: string, productId: string): Promise<{
        id: string;
        product_id: string;
        wishlist_id: string;
        added_at: Date;
    }>;
    removeItem(wishlistId: string, productId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    checkProductExists(productId: string): Promise<boolean>;
}
//# sourceMappingURL=wishlist.repository.d.ts.map