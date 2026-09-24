import { CreateReviewInput, UpdateReviewInput } from './review.dto';
export declare class ReviewService {
    private repository;
    getProductReviews(productId: string): Promise<({
        user: {
            first_name: string;
            last_name: string;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    })[]>;
    createReview(userId: string, productId: string, data: CreateReviewInput): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
    updateReview(userId: string, id: string, data: UpdateReviewInput): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
    deleteReview(userId: string, id: string): Promise<void>;
    approveReview(id: string, isApproved: boolean): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
}
//# sourceMappingURL=review.service.d.ts.map