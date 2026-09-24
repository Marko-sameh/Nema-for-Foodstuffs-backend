import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { successResponse, paginatedResponse } from '../../shared/utils/response';

export class OrderController {
  private service = new OrderService();

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idempotencyKeyHeader = req.headers['idempotency-key'] as string | undefined;
      const result = await this.service.createOrder(req.user!.id, req.body, idempotencyKeyHeader);
      successResponse(res, 201, 'Order created successfully', result);
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, total, page, limit } = await this.service.getUserOrders(req.user!.id, req.query);
      paginatedResponse(res, 200, 'Orders retrieved', data, total, page, limit);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getOrderById((req.params.id as string), req.user!.id);
      successResponse(res, 200, 'Order retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.cancelOrder((req.params.id as string), req.user!.id);
      successResponse(res, 200, 'Order cancelled successfully', result);
    } catch (error) {
      next(error);
    }
  };

  // Admin methods
  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, total, page, limit } = await this.service.getAllOrders(req.query);
      paginatedResponse(res, 200, 'Orders retrieved', data, total, page, limit);
    } catch (error) {
      next(error);
    }
  };

  adminGetOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.adminGetOrderById((req.params.id as string));
      successResponse(res, 200, 'Order retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateOrderStatus((req.params.id as string), req.body, req.user!.id);
      successResponse(res, 200, 'Order status updated', result);
    } catch (error) {
      next(error);
    }
  };
}
