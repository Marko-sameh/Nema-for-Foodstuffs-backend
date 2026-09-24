import { WishlistRepository } from './wishlist.repository';
import { AddToWishlistInput } from './wishlist.dto';

export class WishlistService {
  private repository = new WishlistRepository();

  async getWishlist(userId: string) {
    return this.repository.getOrCreateWishlist(userId);
  }

  async addItem(userId: string, data: AddToWishlistInput) {
    const productExists = await this.repository.checkProductExists(data.productId);
    if (!productExists) {
      throw { statusCode: 404, message: 'Product not found' };
    }

    const wishlist = await this.repository.getOrCreateWishlist(userId);
    
    const existingItem = await this.repository.findItem(wishlist!.id, data.productId);
    if (existingItem) {
      return this.repository.getWishlist(userId); // Already in wishlist
    }

    await this.repository.addItem(wishlist!.id, data.productId);
    return this.repository.getWishlist(userId);
  }

  async removeItem(userId: string, productId: string) {
    const wishlist = await this.repository.getWishlist(userId);
    if (wishlist) {
      await this.repository.removeItem(wishlist.id, productId);
    }
    return this.repository.getWishlist(userId);
  }
}
