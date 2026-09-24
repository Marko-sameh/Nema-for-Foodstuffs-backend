import { Request, Response, NextFunction } from 'express';
export declare class AnalyticsController {
    private service;
    getOverview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSales: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTopProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=analytics.controller.d.ts.map