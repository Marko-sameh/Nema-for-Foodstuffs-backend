import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { successResponse } from '../../shared/utils/response';
import { env } from '../../config/env';

const REFRESH_COOKIE_NAME = 'refreshToken';
const REFRESH_COOKIE_PATH = '/api/v1/auth';

function setRefreshTokenCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: REFRESH_COOKIE_PATH,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearRefreshTokenCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: REFRESH_COOKIE_PATH,
  });
}

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.register(req.body);
      setRefreshTokenCookie(res, result.tokens.refreshToken);
      successResponse(res, 201, 'User registered successfully', {
        user: result.user,
        token: result.tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.login(req.body);
      setRefreshTokenCookie(res, result.tokens.refreshToken);
      successResponse(res, 200, 'Login successful', {
        user: result.user,
        token: result.tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.refreshToken || req.body.refreshToken;
      if (!token) throw { statusCode: 401, message: 'Refresh token missing' };

      const result = await this.service.refreshToken({ refreshToken: token });
      setRefreshTokenCookie(res, result.tokens.refreshToken);
      successResponse(res, 200, 'Token refreshed successfully', {
        token: result.tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        await this.service.logout(req.user.id);
      }
      clearRefreshTokenCookie(res);
      successResponse(res, 200, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.forgotPassword(req.body);
      successResponse(res, 200, result.message);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.resetPassword(req.body);
      successResponse(res, 200, result.message);
    } catch (error) {
      next(error);
    }
  };
}
