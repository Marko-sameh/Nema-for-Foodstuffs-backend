import { Request, Response, NextFunction } from 'express';
import { CouponService } from './coupon.service';
import { successResponse } from '../../shared/utils/response';
import { CartService } from '../cart/cart.service';

export class CouponController {
  private service = new CouponService();
  private cartService = new CartService();

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      // Never trust a client-supplied order amount — compute it server-side from the user's own cart.
      const subtotal = await this.cartService.computeCartSubtotal(req.user!.id);
      const result = await this.service.validateCoupon(code, subtotal, req.user!.id);
      successResponse(res, 200, 'Coupon is valid', result);
    } catch (error) {
      next(error);
    }
  };

  // Admin routes
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAllCoupons();
      successResponse(res, 200, 'Coupons retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createCoupon(req.body);
      successResponse(res, 201, 'Coupon created', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateCoupon((req.params.id as string), req.body);
      successResponse(res, 200, 'Coupon updated', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteCoupon((req.params.id as string));
      successResponse(res, 200, 'Coupon deleted');
    } catch (error) {
      next(error);
    }
  };
}
