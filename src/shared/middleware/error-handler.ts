import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { errorResponse } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Always log the full error server-side for diagnostics.
  console.error('Error:', err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return errorResponse(res, 409, 'A record with these details already exists');
      case 'P2003':
        return errorResponse(res, 400, 'Related record missing or still in use');
      case 'P2025':
        return errorResponse(res, 404, 'Requested record not found');
      default:
        return errorResponse(res, 500, 'Internal Server Error');
    }
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  errorResponse(res, statusCode, message, err.errors || err.details);
};
