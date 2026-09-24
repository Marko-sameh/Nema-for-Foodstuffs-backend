import { prisma } from '../../config/db';
import { CreateReviewInput, UpdateReviewInput } from './review.dto';

export class ReviewRepository {
  async getProductReviews(productId: string) {
    return prisma.review.findMany({
      where: { product_id: productId, is_approved: true },
      include: {
        user: { select: { first_name: true, last_name: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.review.findUnique({
      where: { id },
    });
  }

  async findReviewByUserAndProduct(userId: string, productId: string) {
    return prisma.review.findFirst({
      where: { user_id: userId, product_id: productId },
    });
  }

  async create(userId: string, productId: string, data: CreateReviewInput) {
    return prisma.review.create({
      data: {
        user_id: userId,
        product_id: productId,
        rating: data.rating,
        comment: data.comment,
        is_approved: false, // Requires admin approval
      },
    });
  }

  async update(id: string, data: UpdateReviewInput) {
    return prisma.review.update({
      where: { id },
      data: {
        rating: data.rating,
        comment: data.comment,
        is_approved: false, // Re-approval required after edit
      },
    });
  }

  async delete(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }

  async approve(id: string, isApproved: boolean) {
    return prisma.review.update({
      where: { id },
      data: { is_approved: isApproved },
    });
  }
}
