import { CreateReviewInput, UpdateReviewInput } from './review.dto';
export declare class ReviewRepository {
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
    findById(id: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    } | null>;
    findReviewByUserAndProduct(userId: string, productId: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    } | null>;
    create(userId: string, productId: string, data: CreateReviewInput): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
    update(id: string, data: UpdateReviewInput): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
    approve(id: string, isApproved: boolean): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        product_id: string;
        rating: number;
        comment: string | null;
        is_approved: boolean;
    }>;
}
//# sourceMappingURL=review.repository.d.ts.map