import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { errorResponse } from '../utils/response';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      }) as { body: typeof req.body; query: typeof req.query; params: typeof req.params };
      req.body = validated.body;
      
      // Express 5 makes req.query a getter, so we must mutate the object directly
      Object.keys(req.query).forEach(key => delete req.query[key]);
      Object.assign(req.query, validated.query);
      
      Object.keys(req.params).forEach(key => delete req.params[key]);
      Object.assign(req.params, validated.params);
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        errorResponse(res, 400, 'Validation Error', (error as any).errors);
      } else {
        next(error);
      }
    }
  };
};
