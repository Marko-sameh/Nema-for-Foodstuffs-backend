import { Request, Response, NextFunction } from 'express';
import { SearchService } from './search.service';
import { successResponse } from '../../shared/utils/response';

export class SearchController {
  private service = new SearchService();

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const q = req.query.q as string;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await this.service.search(q, page, limit);
      successResponse(res, 200, 'Search results', result);
    } catch (error) {
      next(error);
    }
  };
}
