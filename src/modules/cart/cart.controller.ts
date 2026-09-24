import { Request, Response, NextFunction } from 'express';
import { CartService } from './cart.service';
import { successResponse } from '../../shared/utils/response';
import { generateSignedSessionId, verifySignedSessionId } from './cart.session';

export class CartController {
  private service = new CartService();

  private getIdentifiers(req: Request) {
    const userId = req.user?.id;
    const rawSessionId = req.headers['x-session-id'] as string | undefined;
    let sessionId: string | undefined;

    if (rawSessionId) {
      const verified = verifySignedSessionId(rawSessionId);
      if (!verified) {
        throw { statusCode: 400, message: 'Invalid or forged session id' };
      }
      sessionId = verified;
    }

    return { userId, sessionId };
  }

  getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = generateSignedSessionId();
      successResponse(res, 200, 'Session created', { sessionId });
    } catch (error) {
      next(error);
    }
  };

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, sessionId } = this.getIdentifiers(req);
      const result = await this.service.getCart(userId, sessionId);
      successResponse(res, 200, 'Cart retrieved', result);
    } catch (error) {
      next(error);
    }
  };

  addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, sessionId } = this.getIdentifiers(req);
      const result = await this.service.addItem(req.body, userId, sessionId);
      successResponse(res, 200, 'Item added to cart', result);
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, sessionId } = this.getIdentifiers(req);
      const result = await this.service.updateItemQuantity((req.params.itemId as string), req.body, userId, sessionId);
      successResponse(res, 200, 'Cart item updated', result);
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, sessionId } = this.getIdentifiers(req);
      const result = await this.service.removeItem((req.params.itemId as string), userId, sessionId);
      successResponse(res, 200, 'Cart item removed', result);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, sessionId } = this.getIdentifiers(req);
      const result = await this.service.clearCart(userId, sessionId);
      successResponse(res, 200, 'Cart cleared', result);
    } catch (error) {
      next(error);
    }
  };
}
