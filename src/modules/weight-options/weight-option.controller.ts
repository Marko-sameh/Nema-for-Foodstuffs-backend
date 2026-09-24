import { Request, Response, NextFunction } from 'express';
import { WeightOptionService } from './weight-option.service';
import { successResponse } from '../../shared/utils/response';

export class WeightOptionController {
  private service = new WeightOptionService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAllWeightOptions();
      successResponse(res, 200, 'Weight options retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createWeightOption(req.body);
      successResponse(res, 201, 'Weight option created', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateWeightOption((req.params.id as string), req.body);
      successResponse(res, 200, 'Weight option updated', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteWeightOption((req.params.id as string), { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Weight option deleted');
    } catch (error) {
      next(error);
    }
  };
}
