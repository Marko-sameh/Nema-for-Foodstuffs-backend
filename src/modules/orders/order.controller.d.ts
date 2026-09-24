import { Request, Response, NextFunction } from 'express';
export declare class OrderController {
    private service;
    createOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    adminGetOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=order.controller.d.ts.map