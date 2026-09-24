import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { successResponse, paginatedResponse } from '../../shared/utils/response';

export class ProductController {
  private service = new ProductService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, total, page, limit } = await this.service.getProducts(req.query);
      paginatedResponse(res, 200, 'Products retrieved', data, total, page, limit);
    } catch (error) {
      next(error);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAdmin = req.user?.role === 'ADMIN';
      const result = await this.service.getProductBySlug((req.params.slug as string), isAdmin);
      successResponse(res, 200, 'Product retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createProduct(req.body, { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 201, 'Product created', result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateProduct((req.params.id as string), req.body, { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Product updated', result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteProduct((req.params.id as string), { actorId: req.user?.id, ip: req.ip });
      successResponse(res, 200, 'Product deleted');
    } catch (error) {
      next(error);
    }
  };

  addImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.addProductImage((req.params.id as string), req.body);
      successResponse(res, 201, 'Product image added', result);
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteProductImage((req.params.id as string), (req.params.imgId as string));
      successResponse(res, 200, 'Product image deleted');
    } catch (error) {
      next(error);
    }
  };
}
