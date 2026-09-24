import { Request, Response, NextFunction } from 'express';
export declare class UserController {
    private service;
    getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMyPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    adminUpdateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map