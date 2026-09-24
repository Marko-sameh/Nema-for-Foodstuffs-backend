import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { errorResponse } from '../utils/response';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return errorResponse(res, 401, 'Unauthorized - Token missing');
  }

  try {
    const decoded = jwt.verify(token, (env.JWT_SECRET as string), { algorithms: ['HS256'] }) as any as { id: string; role: string };
    
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return errorResponse(res, 401, 'Unauthorized - Invalid token');
  }
};

export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, (env.JWT_SECRET as string), { algorithms: ['HS256'] }) as any as { id: string; role: string };
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
  } catch (error) {
    // Ignore error for optional auth
  }
  next();
};
