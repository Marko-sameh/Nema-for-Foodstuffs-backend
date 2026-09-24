import { Request, Response, NextFunction } from 'express';
import { AddressService } from './address.service';
import { successResponse } from '../../shared/utils/response';

export class AddressController {
  private service = new AddressService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getUserAddresses(req.user!.id);
      successResponse(res, 200, 'Addresses retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createAddress(req.user!.id, req.body);
      successResponse(res, 201, 'Address created', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateAddress(req.user!.id, (req.params.id as string), req.body);
      successResponse(res, 200, 'Address updated', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteAddress(req.user!.id, (req.params.id as string));
      successResponse(res, 200, 'Address deleted');
    } catch (error) {
      next(error);
    }
  };

  setDefault = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.setDefaultAddress(req.user!.id, (req.params.id as string));
      successResponse(res, 200, 'Default address updated', result);
    } catch (error) {
      next(error);
    }
  };
}
