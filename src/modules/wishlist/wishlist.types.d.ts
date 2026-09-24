export interface WishlistItemData {
    id: string;
    wishlist_id: string;
    product_id: string;
    added_at: Date;
}
export interface WishlistData {
    id: string;
    user_id: string;
    items: WishlistItemData[];
}
//# sourceMappingURL=wishlist.types.d.ts.map