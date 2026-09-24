import { Request, Response, NextFunction } from 'express';
export declare class ReviewController {
    private service;
    getProductReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    approve: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=review.controller.d.ts.map