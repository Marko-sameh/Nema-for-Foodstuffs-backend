import { prisma } from '../../config/db';
import { UpdateOrderStatusInput } from './order.dto';

export class OrderRepository {
  async getUserCart(userId: string) {
    return prisma.cart.findUnique({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            product: true,
            weight_variant: { include: { weight_option: true } },
          },
        },
      },
    });
  }

  async findProductForOrder(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
      include: { weight_variants: { include: { weight_option: true } } }
    });
  }

  async findShippingFeeSetting() {
    return prisma.setting.findUnique({ where: { key: 'shipping_fee' } });
  }

  async findUserAddress(addressId: string, userId: string) {
    return prisma.address.findFirst({
      where: { id: addressId, user_id: userId }
    });
  }

  async findOrderByIdempotencyKey(userId: string, idempotencyKey: string) {
    return prisma.order.findFirst({
      where: { user_id: userId, idempotency_key: idempotencyKey },
      include: { items: true },
    });
  }

  async findCouponByCode(code: string) {
    return prisma.coupon.findUnique({ where: { code } });
  }

  async findCouponUsageByUserAndCoupon(userId: string, couponId: string) {
    return prisma.couponUsage.findFirst({ where: { user_id: userId, coupon_id: couponId } });
  }

  async createOrderWithTransaction(
    userId: string,
    data: any,
    items: any[],
    coupon: { id: string; type: 'PERCENTAGE' | 'FIXED'; value: number; discount: number } | null
  ) {
    return prisma.$transaction(async (tx: any) => {
      // 1. Create the order
      const order = await tx.order.create({
        data: {
          user_id: userId,
          address_id: data.addressId,
          payment_method: data.paymentMethod,
          subtotal: data.subtotal,
          shipping_fee: data.shippingFee,
          discount: data.discount,
          total: data.total,
          notes: data.notes,
          idempotency_key: data.idempotencyKey ?? null,
          items: {
            create: items.map((item) => ({
              product_id: item.product.id,
              weight_variant_id: item.weight_variant_id,
              product_name_snapshot: item.product.name,
              weight_label_snapshot: item.weight_variant?.weight_option?.label || null,
              weight_grams_snapshot: item.weight_snapshot_grams,
              quantity: item.quantity,
              unit_price: item.price_snapshot,
              total_price: item.quantity * item.price_snapshot,
            })),
          },
          status_history: {
            create: [{ from_status: null, to_status: 'PENDING', note: 'Order created' }],
          },
        },
        include: { items: true },
      });

      // 2. Deduct stock for each item, guarding against negative stock
      for (const item of items) {
        const deductAmount = item.product.unit_type === 'WEIGHT'
          ? item.quantity * (item.weight_snapshot_grams || 1)
          : item.quantity;

        const productUpdate = await tx.product.updateMany({
          where: { id: item.product.id, stock_in_grams: { gte: deductAmount } },
          data: { stock_in_grams: { decrement: deductAmount } },
        });
        if (productUpdate.count === 0) {
          throw { statusCode: 409, message: `Insufficient stock for ${item.product.name}` };
        }

        if (item.weight_variant_id && item.weight_variant?.stock_in_grams !== null && item.weight_variant?.stock_in_grams !== undefined) {
          const variantUpdate = await tx.productWeightVariant.updateMany({
            where: { id: item.weight_variant_id, stock_in_grams: { gte: deductAmount } },
            data: { stock_in_grams: { decrement: deductAmount } },
          });
          if (variantUpdate.count === 0) {
            throw { statusCode: 409, message: `Insufficient stock for ${item.product.name}` };
          }
        }
      }

      // 3. Apply coupon usage, if any
      if (coupon) {
        await tx.coupon.update({
          where: { id: coupon.id },
          data: { used_count: { increment: 1 } },
        });
        await tx.couponUsage.create({
          data: {
            coupon_id: coupon.id,
            user_id: userId,
            order_id: order.id,
          },
        });
      }

      return order;
    });
  }

  async findUserOrders(userId: string, query?: any) {
    const { skip, take } = query || {};
    const where = { user_id: userId };
    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { created_at: 'desc' },
        include: { items: true },
        skip,
        take,
      }),
      prisma.order.count({ where }),
    ]);
    return { data, total };
  }

  async findOrderById(id: string, userId?: string) {
    return prisma.order.findFirst({
      where: {
        id,
        ...(userId && { user_id: userId }),
      },
      include: {
        items: true,
        address: true,
        payments: true,
      },
    });
  }

  async findAllOrders(query?: any) {
    const { skip, take } = query || {};
    const [data, total] = await Promise.all([
      prisma.order.findMany({
        orderBy: { created_at: 'desc' },
        include: {
          user: { select: { first_name: true, last_name: true, email: true } },
        },
        skip,
        take,
      }),
      prisma.order.count(),
    ]);
    return { data, total };
  }

  async updateOrderStatusWithHistory(
    id: string,
    data: UpdateOrderStatusInput,
    fromStatus: string,
    changedByUserId?: string
  ) {
    return prisma.$transaction(async (tx: any) => {
      const order = await tx.order.update({
        where: { id },
        data: {
          status: data.status,
          ...(data.paymentStatus && { payment_status: data.paymentStatus }),
        },
        include: { items: true, payments: true },
      });

      await tx.orderStatusHistory.create({
        data: {
          order_id: id,
          from_status: fromStatus as any,
          to_status: data.status,
          changed_by_user_id: changedByUserId ?? null,
          note: data.note ?? null,
        },
      });

      // COD paid on delivery: mark order + payment as paid/success.
      if (data.status === 'DELIVERED' && order.payment_method === 'COD' && order.payment_status !== 'PAID') {
        await tx.order.update({ where: { id }, data: { payment_status: 'PAID' } });
        await tx.payment.updateMany({
          where: { order_id: id, provider: 'COD' },
          data: { status: 'SUCCESS', paid_at: new Date() },
        });
      }

      return tx.order.findUnique({ where: { id }, include: { items: true, payments: true } });
    });
  }

  async cancelOrderAndRestoreStock(id: string, fromStatus: string, changedByUserId?: string, note?: string) {
    return prisma.$transaction(async (tx: any) => {
      const order = await tx.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
        include: { items: true },
      });

      await tx.orderStatusHistory.create({
        data: {
          order_id: id,
          from_status: fromStatus as any,
          to_status: 'CANCELLED',
          changed_by_user_id: changedByUserId ?? null,
          note: note ?? null,
        },
      });

      // Restore stock
      for (const item of order.items) {
        const restoreAmount = item.weight_grams_snapshot
          ? item.quantity * item.weight_grams_snapshot
          : item.quantity;

        await tx.product.update({
          where: { id: item.product_id },
          data: { stock_in_grams: { increment: restoreAmount } },
        });

        if (item.weight_variant_id) {
          const variant = await tx.productWeightVariant.findUnique({ where: { id: item.weight_variant_id } });
          if (variant && variant.stock_in_grams !== null) {
            await tx.productWeightVariant.update({
              where: { id: item.weight_variant_id },
              data: { stock_in_grams: { increment: restoreAmount } },
            });
          }
        }
      }

      return order;
    });
  }
}
