import { prisma } from '../../config/db';

export class CartRepository {
  async getCart(userId?: string, sessionId?: string) {
    const where = userId ? { user_id: userId } : { session_id: sessionId };
    return prisma.cart.findUnique({
      where,
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, slug: true, thumbnail_url: true, unit_type: true, stock_in_grams: true } },
            weight_variant: { include: { weight_option: true } },
          },
        },
      },
    });
  }

  async createCart(userId?: string, sessionId?: string) {
    return prisma.cart.create({
      data: {
        ...(userId ? { user_id: userId } : { session_id: sessionId }),
      },
    });
  }

  async getOrCreateCart(userId?: string, sessionId?: string) {
    let cart = await this.getCart(userId, sessionId);
    if (!cart) {
      cart = await this.createCart(userId, sessionId) as any; // Ignore include mismatch for empty cart
    }
    return cart;
  }

  async findCartItem(cartId: string, productId: string, weightVariantId?: string) {
    return prisma.cartItem.findFirst({
      where: {
        cart_id: cartId,
        product_id: productId,
        ...(weightVariantId ? { weight_variant_id: weightVariantId } : { weight_variant_id: null }),
      },
    });
  }

  async addCartItem(data: { cartId: string; productId: string; weightVariantId?: string; quantity: number; priceSnapshot: number; weightSnapshotGrams?: number }) {
    return prisma.cartItem.create({
      data: {
        cart_id: data.cartId,
        product_id: data.productId,
        weight_variant_id: data.weightVariantId,
        quantity: data.quantity,
        price_snapshot: data.priceSnapshot,
        weight_snapshot_grams: data.weightSnapshotGrams,
      },
    });
  }

  async updateCartItemQuantity(itemId: string, quantity: number) {
    return prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeCartItem(itemId: string) {
    return prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(cartId: string) {
    return prisma.cartItem.deleteMany({
      where: { cart_id: cartId },
    });
  }

  async assignCartToUser(cartId: string, userId: string) {
    return prisma.cart.update({
      where: { id: cartId },
      data: { user_id: userId, session_id: null },
    });
  }

  async moveItemToCart(itemId: string, targetCartId: string) {
    return prisma.cartItem.update({
      where: { id: itemId },
      data: { cart_id: targetCartId },
    });
  }

  async deleteCart(cartId: string) {
    return prisma.cart.delete({
      where: { id: cartId },
    });
  }

  async getProductAndVariant(productId: string, weightVariantId?: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: weightVariantId ? {
        weight_variants: {
          where: { id: weightVariantId },
          include: { weight_option: true },
        },
      } : undefined,
    });
    return product;
  }
}
