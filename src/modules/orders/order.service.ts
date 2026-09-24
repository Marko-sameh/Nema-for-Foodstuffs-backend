import { OrderRepository } from './order.repository';
import { getPaginationData } from '../../shared/utils/paginate';
import { CreateOrderInput, UpdateOrderStatusInput } from './order.dto';

import { CartService } from '../cart/cart.service';

const ORDER_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

export class OrderService {
  private repository = new OrderRepository();
  private cartService = new CartService();

  async createOrder(userId: string, data: CreateOrderInput, idempotencyKeyHeader?: string) {
    const idempotencyKey = idempotencyKeyHeader || data.idempotencyKey;

    if (idempotencyKey) {
      const existing = await this.repository.findOrderByIdempotencyKey(userId, idempotencyKey);
      if (existing) return existing;
    }

    let subtotal = 0;
    const processedItems = [];

    for (const item of data.items) {
      const product = await this.repository.findProductForOrder(item.productId);

      if (!product) throw { statusCode: 400, message: `Product not found: ${item.productId}` };

      let priceSnapshot = 0;
      let weightSnapshotGrams = null;
      let variantName = null;

      if (product.unit_type === 'WEIGHT') {
        const variant = product.weight_variants.find((v: any) => v.id === item.variantId);
        if (!variant) throw { statusCode: 400, message: 'Invalid weight variant selected' };
        priceSnapshot = variant.price;
        weightSnapshotGrams = variant.weight_option.value_in_grams;
        variantName = variant.weight_option.label;
      } else {
        priceSnapshot = product.fixed_price ?? 0;
      }

      const requiredStock = product.unit_type === 'WEIGHT'
        ? item.quantity * (weightSnapshotGrams || 1)
        : item.quantity;

      if (product.stock_in_grams < requiredStock) {
        throw { statusCode: 400, message: `Insufficient stock for product: ${product.name}` };
      }

      if (product.unit_type === 'WEIGHT') {
        const variant = product.weight_variants.find((v: any) => v.id === item.variantId);
        if (variant && variant.stock_in_grams !== null && variant.stock_in_grams < requiredStock) {
          throw { statusCode: 400, message: `Insufficient stock for variant: ${variant.weight_option.label}` };
        }
      }

      processedItems.push({
        product: { id: product.id, name: product.name, unit_type: product.unit_type },
        weight_variant_id: item.variantId || null,
        weight_variant: variantName ? { weight_option: { label: variantName }, stock_in_grams: null } : null,
        weight_snapshot_grams: weightSnapshotGrams,
        quantity: item.quantity,
        price_snapshot: priceSnapshot,
      });

      subtotal += item.quantity * priceSnapshot;
    }

    const shippingFeeSetting = await this.repository.findShippingFeeSetting();
    const shippingFee = shippingFeeSetting ? Number(shippingFeeSetting.value) : 25;

    const address = await this.repository.findUserAddress(data.addressId, userId);

    if (!address) {
      throw { statusCode: 400, message: 'Invalid or missing delivery address.' };
    }

    // Coupon validation & discount computation (server-computed subtotal only)
    let discount = 0;
    let couponForTransaction: { id: string; type: 'PERCENTAGE' | 'FIXED'; value: number; discount: number } | null = null;

    if (data.couponCode) {
      const coupon = await this.repository.findCouponByCode(data.couponCode);
      if (!coupon) throw { statusCode: 400, message: 'Invalid coupon code' };
      if (!coupon.is_active) throw { statusCode: 400, message: 'Coupon is not active' };
      if (coupon.expires_at < new Date()) throw { statusCode: 400, message: 'Coupon has expired' };
      if (coupon.min_order_amount > subtotal) {
        throw { statusCode: 400, message: `Minimum order amount of ${coupon.min_order_amount} required` };
      }
      if (coupon.max_uses !== null && coupon.used_count >= coupon.max_uses) {
        throw { statusCode: 400, message: 'Coupon usage limit reached' };
      }

      const alreadyUsed = await this.repository.findCouponUsageByUserAndCoupon(userId, coupon.id);
      if (alreadyUsed) throw { statusCode: 400, message: 'You have already used this coupon' };

      discount = coupon.type === 'FIXED' ? coupon.value : subtotal * (coupon.value / 100);
      discount = Math.min(discount, subtotal);

      couponForTransaction = { id: coupon.id, type: coupon.type, value: coupon.value, discount };
    }

    const total = subtotal + shippingFee - discount;

    const orderData = {
      addressId: data.addressId,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      subtotal,
      shippingFee,
      discount,
      total,
      idempotencyKey,
    };

    try {
      const order = await this.repository.createOrderWithTransaction(userId, orderData, processedItems, couponForTransaction);
      await this.cartService.clearCart(userId);
      return order;
    } catch (error: any) {
      // Handle the unique-constraint race on idempotency_key: another concurrent request
      // won the race, so return that order instead of erroring out.
      if (idempotencyKey && error?.code === 'P2002') {
        const existing = await this.repository.findOrderByIdempotencyKey(userId, idempotencyKey);
        if (existing) return existing;
      }
      throw error;
    }
  }

  async getUserOrders(userId: string, query: any) {
    const { skip, take, page, limit } = getPaginationData(query);
    const { data, total } = await this.repository.findUserOrders(userId, { skip, take });
    return { data, total, page, limit };
  }

  async getOrderById(id: string, userId: string) {
    const order = await this.repository.findOrderById(id, userId);
    if (!order) throw { statusCode: 404, message: 'Order not found' };
    return order;
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.repository.findOrderById(id, userId);
    if (!order) throw { statusCode: 404, message: 'Order not found' };

    if (!ORDER_TRANSITIONS[order.status]?.includes('CANCELLED')) {
      throw { statusCode: 400, message: 'Order cannot be cancelled at this stage' };
    }

    return this.repository.cancelOrderAndRestoreStock(id, order.status, userId, 'Cancelled by customer');
  }

  // Admin methods
  async getAllOrders(query: any) {
    const { skip, take, page, limit } = getPaginationData(query);
    const { data, total } = await this.repository.findAllOrders({ skip, take });
    return { data, total, page, limit };
  }

  async adminGetOrderById(id: string) {
    const order = await this.repository.findOrderById(id);
    if (!order) throw { statusCode: 404, message: 'Order not found' };
    return order;
  }

  async updateOrderStatus(id: string, data: UpdateOrderStatusInput, changedByUserId?: string) {
    const order = await this.repository.findOrderById(id);
    if (!order) throw { statusCode: 404, message: 'Order not found' };

    const allowedTransitions = ORDER_TRANSITIONS[order.status] || [];
    if (order.status !== data.status && !allowedTransitions.includes(data.status)) {
      throw { statusCode: 400, message: `Cannot transition order from ${order.status} to ${data.status}` };
    }

    if (data.status === 'CANCELLED' && order.status !== 'CANCELLED') {
      return this.repository.cancelOrderAndRestoreStock(id, order.status, changedByUserId, data.note);
    }

    return this.repository.updateOrderStatusWithHistory(id, data, order.status, changedByUserId);
  }
}
