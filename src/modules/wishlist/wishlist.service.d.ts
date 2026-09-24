import { AddToWishlistInput } from './wishlist.dto';
export declare class WishlistService {
    private repository;
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
    addItem(userId: string, data: AddToWishlistInput): Promise<({
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
    removeItem(userId: string, productId: string): Promise<({
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
}
//# sourceMappingURL=wishlist.service.d.ts.map