export interface CartItemData {
    id: string;
    cart_id: string;
    product_id: string;
    weight_variant_id: string | null;
    quantity: number;
    price_snapshot: number;
    weight_snapshot_grams: number | null;
}
export interface CartData {
    id: string;
    user_id: string | null;
    session_id: string | null;
    items: CartItemData[];
}
export interface CartIdentifier {
    userId?: string;
    sessionId?: string;
}
//# sourceMappingURL=cart.types.d.ts.map