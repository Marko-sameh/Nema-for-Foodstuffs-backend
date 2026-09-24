import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return errorResponse(res, 401, 'Unauthorized');
  }

  if (req.user.role !== 'ADMIN') {
    return errorResponse(res, 403, 'Forbidden - Admins only');
  }

  next();
};
