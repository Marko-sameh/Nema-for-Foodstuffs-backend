import { CartRepository } from './cart.repository';
import { AddToCartInput, UpdateCartItemInput } from './cart.dto';

export class CartService {
  private repository = new CartRepository();

  async getCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) throw { statusCode: 400, message: 'User ID or Session ID required' };
    return this.repository.getOrCreateCart(userId, sessionId);
  }

  async addItem(data: AddToCartInput, userId?: string, sessionId?: string) {
    if (!userId && !sessionId) throw { statusCode: 400, message: 'User ID or Session ID required' };

    const cart = await this.repository.getOrCreateCart(userId, sessionId);
    const product = await this.repository.getProductAndVariant(data.productId, data.weightVariantId) as any;

    if (!product) throw { statusCode: 404, message: 'Product not found' };
    if (!product.is_active) throw { statusCode: 400, message: 'Product is not available' };

    let priceSnapshot = 0;
    let weightSnapshotGrams = null;

    if (product.unit_type === 'WEIGHT') {
      if (!data.weightVariantId || !product.weight_variants?.length) {
        throw { statusCode: 400, message: 'Weight variant is required for weight-based products' };
      }
      const variant = product.weight_variants[0];
      priceSnapshot = variant.price;
      weightSnapshotGrams = variant.weight_option.value_in_grams;
    } else {
      if (!product.fixed_price) throw { statusCode: 400, message: 'Product has no fixed price' };
      priceSnapshot = product.fixed_price;
    }

    const existingItem = await this.repository.findCartItem(cart!.id, data.productId, data.weightVariantId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const requestedQuantity = currentQuantity + data.quantity;

    // Validate stock
    // Convention: stock_in_grams (product AND variant) is ALWAYS stored in grams.
    // To get purchasable "units" of a weight variant we must divide by the variant's
    // weight_option.value_in_grams (floor) — never compare grams to a unit count directly.
    if (product.unit_type === 'WEIGHT') {
      const variantStock = product.weight_variants[0].stock_in_grams;
      const baseStock = product.stock_in_grams;
      const unitGrams = weightSnapshotGrams || 1;
      const availableStock = variantStock !== null ? Math.floor(variantStock / unitGrams) : Math.floor(baseStock / unitGrams);
      if (requestedQuantity > availableStock) {
        throw { statusCode: 400, message: 'Not enough stock available' };
      }
    } else {
      if (requestedQuantity > product.stock_in_grams) {
        throw { statusCode: 400, message: 'Not enough stock available' };
      }
    }

    if (existingItem) {
      await this.repository.updateCartItemQuantity(existingItem.id, existingItem.quantity + data.quantity);
    } else {
      await this.repository.addCartItem({
        cartId: cart!.id,
        productId: data.productId,
        ...(data.weightVariantId && { weightVariantId: data.weightVariantId }),
        quantity: data.quantity,
        priceSnapshot,
        ...(weightSnapshotGrams !== null && { weightSnapshotGrams }),
      });
    }

    return this.getCart(userId, sessionId);
  }

  async updateItemQuantity(itemId: string, data: UpdateCartItemInput, userId?: string, sessionId?: string) {
    const cart = await this.repository.getCart(userId, sessionId);
    if (!cart) throw { statusCode: 404, message: 'Cart not found' };

    const item = cart.items.find((i: any) => i.id === itemId);
    if (!item) throw { statusCode: 404, message: 'Item not found in your cart' };

    const product = item.product as any;
    const requestedQuantity = data.quantity;

    if (product.unit_type === 'WEIGHT') {
      // Convention: stock_in_grams is ALWAYS in grams; convert to units via weight_option.value_in_grams.
      const variant = item.weight_variant as any;
      const variantStock = variant.stock_in_grams;
      const baseStock = product.stock_in_grams;
      const weightOptionGrams = variant.weight_option.value_in_grams || 1;
      const availableStock = variantStock !== null ? Math.floor(variantStock / weightOptionGrams) : Math.floor(baseStock / weightOptionGrams);
      
      if (requestedQuantity > availableStock) {
        throw { statusCode: 400, message: 'Not enough stock available' };
      }
    } else {
      if (requestedQuantity > product.stock_in_grams) {
        throw { statusCode: 400, message: 'Not enough stock available' };
      }
    }

    await this.repository.updateCartItemQuantity(itemId, data.quantity);
    return this.getCart(userId, sessionId);
  }

  async removeItem(itemId: string, userId?: string, sessionId?: string) {
    const cart = await this.repository.getCart(userId, sessionId);
    if (!cart) throw { statusCode: 404, message: 'Cart not found' };

    const item = cart.items.find((i: any) => i.id === itemId);
    if (!item) throw { statusCode: 404, message: 'Item not found in your cart' };

    await this.repository.removeCartItem(itemId);
    return this.getCart(userId, sessionId);
  }

  async clearCart(userId?: string, sessionId?: string) {
    const cart = await this.repository.getCart(userId, sessionId);
    if (cart) {
      await this.repository.clearCart(cart.id);
    }
    return this.getCart(userId, sessionId);
  }

  async computeCartSubtotal(userId?: string, sessionId?: string): Promise<number> {
    const cart = await this.repository.getCart(userId, sessionId);
    if (!cart || cart.items.length === 0) {
      throw { statusCode: 400, message: 'Cart is empty' };
    }
    return cart.items.reduce((sum: number, item: any) => sum + item.quantity * item.price_snapshot, 0);
  }

  async mergeGuestCart(sessionId: string, userId: string) {
    const guestCart = await this.repository.getCart(undefined, sessionId);
    if (!guestCart || guestCart.items.length === 0) return;

    let userCart = await this.repository.getCart(userId);
    
    if (!userCart) {
      await this.repository.assignCartToUser(guestCart.id, userId);
      return;
    }

    for (const guestItem of guestCart.items) {
      const existingItem = await this.repository.findCartItem(userCart.id, guestItem.product_id, guestItem.weight_variant_id ?? undefined);
      
      if (existingItem) {
         await this.repository.updateCartItemQuantity(existingItem.id, existingItem.quantity + guestItem.quantity);
      } else {
         await this.repository.moveItemToCart(guestItem.id, userCart.id);
      }
    }
    
    await this.repository.deleteCart(guestCart.id);
  }
}
