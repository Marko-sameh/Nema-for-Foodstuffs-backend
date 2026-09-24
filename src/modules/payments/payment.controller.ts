import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';
import { successResponse } from '../../shared/utils/response';

export class PaymentController {
  private service = new PaymentService();

  initiate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.initiatePayment(req.body.orderId, req.user!.id);
      successResponse(res, 200, 'Payment initiated', result);
    } catch (error) {
      next(error);
    }
  };

  getOrderPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getOrderPayments((req.params.orderId as string), req.user!.id);
      successResponse(res, 200, 'Payments retrieved', result);
    } catch (error) {
      next(error);
    }
  };
}
