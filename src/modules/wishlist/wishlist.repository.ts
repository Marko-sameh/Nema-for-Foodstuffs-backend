import { prisma } from '../../config/db';

export class WishlistRepository {
  async getWishlist(userId: string) {
    return prisma.wishlist.findUnique({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, slug: true, thumbnail_url: true, unit_type: true, price_per_kg: true, fixed_price: true },
            },
          },
        },
      },
    });
  }

  async createWishlist(userId: string) {
    return prisma.wishlist.create({
      data: { user_id: userId },
    });
  }

  async getOrCreateWishlist(userId: string) {
    let wishlist = await this.getWishlist(userId);
    if (!wishlist) {
      wishlist = await this.createWishlist(userId) as any;
    }
    return wishlist;
  }

  async findItem(wishlistId: string, productId: string) {
    return prisma.wishlistItem.findFirst({
      where: { wishlist_id: wishlistId, product_id: productId },
    });
  }

  async addItem(wishlistId: string, productId: string) {
    return prisma.wishlistItem.create({
      data: {
        wishlist_id: wishlistId,
        product_id: productId,
      },
    });
  }

  async removeItem(wishlistId: string, productId: string) {
    return prisma.wishlistItem.deleteMany({
      where: { wishlist_id: wishlistId, product_id: productId },
    });
  }

  async checkProductExists(productId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    return !!product;
  }
}
