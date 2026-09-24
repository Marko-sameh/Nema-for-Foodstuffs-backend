import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { successResponse, paginatedResponse } from '../../shared/utils/response';

export class CategoryController {
  private service = new CategoryService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, total, page, limit } = await this.service.getAllCategories(req.query);
      paginatedResponse(res, 200, 'Categories retrieved', data, total, page, limit);
    } catch (error) {
      next(error);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getCategoryBySlug((req.params.slug as string));
      successResponse(res, 200, 'Category retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createCategory(req.body, { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 201, 'Category created', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateCategory((req.params.id as string), req.body, { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Category updated', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteCategory((req.params.id as string), { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Category deleted');
    } catch (error) {
      next(error);
    }
  };
}
