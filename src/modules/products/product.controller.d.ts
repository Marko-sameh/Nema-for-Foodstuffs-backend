import { Request, Response, NextFunction } from 'express';
export declare class ProductController {
    private service;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getBySlug: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map