import { CreateCouponInput, UpdateCouponInput } from './coupon.dto';
export declare class CouponService {
    private repository;
    validateCoupon(code: string, orderAmount: number, userId?: string): Promise<{
        code: string;
        type: import("@prisma/client").$Enums.CouponType;
        value: number;
        discountAmount: number;
    }>;
    computeDiscount(coupon: {
        type: string;
        value: number;
    }, orderAmount: number): number;
    getAllCoupons(): Promise<{
        id: string;
        expires_at: Date;
        is_active: boolean;
        code: string;
        type: import("@prisma/client").$Enums.CouponType;
        value: number;
        min_order_amount: number;
        max_uses: number | null;
        used_count: number;
    }[]>;
    createCoupon(data: CreateCouponInput): Promise<{
        id: string;
        expires_at: Date;
        is_active: boolean;
        code: string;
        type: import("@prisma/client").$Enums.CouponType;
        value: number;
        min_order_amount: number;
        max_uses: number | null;
        used_count: number;
    }>;
    updateCoupon(id: string, data: UpdateCouponInput): Promise<{
        id: string;
        expires_at: Date;
        is_active: boolean;
        code: string;
        type: import("@prisma/client").$Enums.CouponType;
        value: number;
        min_order_amount: number;
        max_uses: number | null;
        used_count: number;
    }>;
    deleteCoupon(id: string): Promise<void>;
}
//# sourceMappingURL=coupon.service.d.ts.map