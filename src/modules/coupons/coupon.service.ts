import { CouponRepository } from './coupon.repository';
import { CreateCouponInput, UpdateCouponInput } from './coupon.dto';

export class CouponService {
  private repository = new CouponRepository();

  async validateCoupon(code: string, orderAmount: number, userId?: string) {
    const coupon = await this.repository.findByCode(code);

    if (!coupon) throw { statusCode: 400, message: 'Invalid coupon code' };
    if (!coupon.is_active) throw { statusCode: 400, message: 'Coupon is not active' };
    if (coupon.expires_at < new Date()) throw { statusCode: 400, message: 'Coupon has expired' };
    if (coupon.min_order_amount > orderAmount) throw { statusCode: 400, message: `Minimum order amount of ${coupon.min_order_amount} required` };
    if (coupon.max_uses !== null && coupon.used_count >= coupon.max_uses) throw { statusCode: 400, message: 'Coupon usage limit reached' };

    if (userId) {
      const alreadyUsed = await this.repository.findUsageByUserAndCoupon(userId, coupon.id);
      if (alreadyUsed) throw { statusCode: 400, message: 'You have already used this coupon' };
    }

    const discountAmount = this.computeDiscount(coupon, orderAmount);

    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discountAmount,
    };
  }

  computeDiscount(coupon: { type: string; value: number }, orderAmount: number) {
    let discountAmount = 0;
    if (coupon.type === 'FIXED') {
      discountAmount = coupon.value;
    } else if (coupon.type === 'PERCENTAGE') {
      discountAmount = orderAmount * (coupon.value / 100);
    }

    // Ensure discount doesn't exceed order amount
    return Math.min(discountAmount, orderAmount);
  }

  // Admin methods
  async getAllCoupons() {
    return this.repository.findAll();
  }

  async createCoupon(data: CreateCouponInput) {
    const existing = await this.repository.findByCode(data.code);
    if (existing) throw { statusCode: 400, message: 'Coupon code already exists' };
    return this.repository.create(data);
  }

  async updateCoupon(id: string, data: UpdateCouponInput) {
    const coupon = await this.repository.findById(id);
    if (!coupon) throw { statusCode: 404, message: 'Coupon not found' };

    if (data.code && data.code !== coupon.code) {
      const existing = await this.repository.findByCode(data.code);
      if (existing) throw { statusCode: 400, message: 'Coupon code already exists' };
    }

    return this.repository.update(id, data);
  }

  async deleteCoupon(id: string) {
    const coupon = await this.repository.findById(id);
    if (!coupon) throw { statusCode: 404, message: 'Coupon not found' };
    await this.repository.delete(id);
  }
}
