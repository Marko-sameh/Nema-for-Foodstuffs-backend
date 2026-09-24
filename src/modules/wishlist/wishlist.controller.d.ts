import { Request, Response, NextFunction } from 'express';
export declare class WishlistController {
    private service;
    getWishlist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=wishlist.controller.d.ts.map