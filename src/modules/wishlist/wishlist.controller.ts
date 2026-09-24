import { Request, Response, NextFunction } from 'express';
import { WishlistService } from './wishlist.service';
import { successResponse } from '../../shared/utils/response';

export class WishlistController {
  private service = new WishlistService();

  getWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getWishlist(req.user!.id);
      successResponse(res, 200, 'Wishlist retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.addItem(req.user!.id, req.body);
      successResponse(res, 200, 'Item added to wishlist', result);
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.removeItem(req.user!.id, (req.params.productId as string));
      successResponse(res, 200, 'Item removed from wishlist', result);
    } catch (error) {
      next(error);
    }
  };
}
