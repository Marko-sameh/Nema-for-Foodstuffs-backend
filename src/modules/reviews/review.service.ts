import { ReviewRepository } from './review.repository';
import { CreateReviewInput, UpdateReviewInput } from './review.dto';

export class ReviewService {
  private repository = new ReviewRepository();

  async getProductReviews(productId: string) {
    return this.repository.getProductReviews(productId);
  }

  async createReview(userId: string, productId: string, data: CreateReviewInput) {
    const existingReview = await this.repository.findReviewByUserAndProduct(userId, productId);
    if (existingReview) {
      throw { statusCode: 400, message: 'You have already reviewed this product' };
    }

    return this.repository.create(userId, productId, data);
  }

  async updateReview(userId: string, id: string, data: UpdateReviewInput) {
    const review = await this.repository.findById(id);
    if (!review) throw { statusCode: 404, message: 'Review not found' };
    if (review.user_id !== userId) throw { statusCode: 403, message: 'Forbidden' };

    return this.repository.update(id, data);
  }

  async deleteReview(userId: string, id: string) {
    const review = await this.repository.findById(id);
    if (!review) throw { statusCode: 404, message: 'Review not found' };
    if (review.user_id !== userId) throw { statusCode: 403, message: 'Forbidden' };

    await this.repository.delete(id);
  }

  async approveReview(id: string, isApproved: boolean) {
    const review = await this.repository.findById(id);
    if (!review) throw { statusCode: 404, message: 'Review not found' };

    return this.repository.approve(id, isApproved);
  }
}
