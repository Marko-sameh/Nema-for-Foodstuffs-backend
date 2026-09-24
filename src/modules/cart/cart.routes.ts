import { Router } from 'express';
import { CartController } from './cart.controller';
import { validate } from '../../shared/middleware/validate';
import { optionalAuthMiddleware } from '../../shared/middleware/auth.middleware';
import { addToCartSchema, updateCartItemSchema, cartItemIdParamSchema } from './cart.dto';

const router = Router();
const controller = new CartController();

/**
 * @openapi
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

// Public: issue a signed guest session id (no auth required)
/**
 * @openapi
 * /cart/session:
 *   get:
 *     summary: Get a guest cart session
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Guest session initialized
 */
router.get('/session', controller.getSession);

// Optional auth because cart supports guests via x-session-id
router.use(optionalAuthMiddleware);

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Get current cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-session-id
 *         schema:
 *           type: string
 *         description: Guest session ID if not logged in
 *     responses:
 *       200:
 *         description: Cart details
 */
router.get('/', controller.getCart);

/**
 * @openapi
 * /cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-session-id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               weightVariantId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added
 */
router.post('/items', validate(addToCartSchema), controller.addItem);

/**
 * @openapi
 * /cart/items/{itemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: header
 *         name: x-session-id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated
 */
router.patch('/items/:itemId', validate(updateCartItemSchema), controller.updateItem);

/**
 * @openapi
 * /cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: header
 *         name: x-session-id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete('/items/:itemId', validate(cartItemIdParamSchema), controller.removeItem);

/**
 * @openapi
 * /cart:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-session-id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete('/', controller.clearCart);

export default router;
