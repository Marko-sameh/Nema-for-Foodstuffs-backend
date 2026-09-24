import { Request, Response, NextFunction } from 'express';
export declare class AddressController {
    private service;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    setDefault: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=address.controller.d.ts.map