import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './review.service';
import { successResponse } from '../../shared/utils/response';

export class ReviewController {
  private service = new ReviewService();

  getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getProductReviews((req.params.productId as string));
      successResponse(res, 200, 'Reviews retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createReview(req.user!.id, (req.params.productId as string), req.body);
      successResponse(res, 201, 'Review submitted and pending approval', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateReview(req.user!.id, (req.params.id as string), req.body);
      successResponse(res, 200, 'Review updated and pending approval', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteReview(req.user!.id, (req.params.id as string));
      successResponse(res, 200, 'Review deleted');
    } catch (error) {
      next(error);
    }
  };

  approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.approveReview((req.params.id as string), req.body.isApproved);
      successResponse(res, 200, 'Review approval status updated', result);
    } catch (error) {
      next(error);
    }
  };
}
