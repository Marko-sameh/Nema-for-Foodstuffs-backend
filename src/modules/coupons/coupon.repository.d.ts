import { CreateCouponInput, UpdateCouponInput } from './coupon.dto';
export declare class CouponRepository {
    findAll(): Promise<{
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
    findById(id: string): Promise<{
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
    findByCode(code: string): Promise<{
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
    create(data: CreateCouponInput): Promise<{
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
    update(id: string, data: UpdateCouponInput): Promise<{
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
    findUsageByUserAndCoupon(userId: string, couponId: string): Promise<{
        id: string;
        user_id: string;
        coupon_id: string;
        order_id: string;
        used_at: Date;
    } | null>;
    delete(id: string): Promise<{
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
}
//# sourceMappingURL=coupon.repository.d.ts.map