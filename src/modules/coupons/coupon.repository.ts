import { prisma } from '../../config/db';
import { CreateCouponInput, UpdateCouponInput } from './coupon.dto';

export class CouponRepository {
  async findAll() {
    return prisma.coupon.findMany({
      orderBy: { expires_at: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.coupon.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string) {
    return prisma.coupon.findUnique({
      where: { code },
    });
  }

  async create(data: CreateCouponInput) {
    return prisma.coupon.create({
      data: {
        code: data.code,
        type: data.type,
        value: data.value,
        min_order_amount: data.minOrderAmount,
        max_uses: data.maxUses,
        expires_at: new Date(data.expiresAt),
        is_active: data.isActive,
      },
    });
  }

  async update(id: string, data: UpdateCouponInput) {
    return prisma.coupon.update({
      where: { id },
      data: {
        code: data.code,
        type: data.type,
        value: data.value,
        min_order_amount: data.minOrderAmount,
        max_uses: data.maxUses,
        ...(data.expiresAt && { expires_at: new Date(data.expiresAt) }),
        is_active: data.isActive,
      },
    });
  }

  async findUsageByUserAndCoupon(userId: string, couponId: string) {
    return prisma.couponUsage.findFirst({
      where: { user_id: userId, coupon_id: couponId },
    });
  }

  async delete(id: string) {
    return prisma.coupon.delete({
      where: { id },
    });
  }
}
