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
      const period = req.query.period as 'daily' | 'monthly';
      const result = await this.service.getSales(period);
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
