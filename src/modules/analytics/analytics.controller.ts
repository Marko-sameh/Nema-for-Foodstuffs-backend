import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { successResponse } from '../../shared/utils/response';

export class AnalyticsController {
  private service = new AnalyticsService();

  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getOverview();
      successResponse(res, 200, 'Analytics overview', result);
    } catch (error) {
      next(error);
    }
  };

  getSales = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string, 10) : 30;
      const result = await this.service.getSales(days);
      successResponse(res, 200, 'Sales analytics', result);
    } catch (error) {
      next(error);
    }
  };

  getTopProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit as unknown as number;
      const result = await this.service.getTopProducts(limit);
      successResponse(res, 200, 'Top products', result);
    } catch (error) {
      next(error);
    }
  };
}
