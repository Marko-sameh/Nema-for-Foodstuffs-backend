import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { successResponse, paginatedResponse } from '../../shared/utils/response';

export class UserController {
  private service = new UserService();

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getProfile(req.user!.id);
      successResponse(res, 200, 'Profile retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.updateProfile(req.user!.id, req.body);
      successResponse(res, 200, 'Profile updated', result);
    } catch (error) {
      next(error);
    }
  };

  updateMyPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.updatePassword(req.user!.id, req.body);
      successResponse(res, 200, 'Password updated');
    } catch (error) {
      next(error);
    }
  };

  // Admin routes
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, total, page, limit } = await this.service.getAllUsers(req.query as any);
      paginatedResponse(res, 200, 'Users retrieved', data, total, page, limit);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getUserById((req.params.id as string));
      successResponse(res, 200, 'User retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  adminUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.adminUpdateUser((req.params.id as string), req.body, req.user?.id, req.ip);
      successResponse(res, 200, 'User updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteUser((req.params.id as string), req.user?.id, req.ip);
      successResponse(res, 200, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}
