import { CouponType } from '@prisma/client';

export interface CouponData {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  min_order_amount: number;
  max_uses: number | null;
  used_count: number;
  expires_at: Date;
  is_active: boolean;
}

export interface ValidateCouponResult {
  valid: boolean;
  coupon?: CouponData;
  discountAmount?: number;
  message?: string;
}
