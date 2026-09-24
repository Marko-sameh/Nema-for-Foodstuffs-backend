import { Request, Response, NextFunction } from 'express';
import { SettingsService } from './settings.service';
import { successResponse } from '../../shared/utils/response';

export class SettingsController {
  private service = new SettingsService();

  getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await this.service.getSettings();
      successResponse(res, 200, 'Settings fetched successfully', settings);
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await this.service.updateSettings(req.body, { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Settings updated successfully', settings);
    } catch (error) {
      next(error);
    }
  };
}
