import { Request, Response, NextFunction } from 'express';
export declare class PaymentController {
    private service;
    initiate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrderPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=payment.controller.d.ts.map