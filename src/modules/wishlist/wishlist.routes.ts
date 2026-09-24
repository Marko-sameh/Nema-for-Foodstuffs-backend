import { Router } from 'express';
import { WishlistController } from './wishlist.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { addToWishlistSchema, removeWishlistItemSchema } from './wishlist.dto';

const router = Router();
const controller = new WishlistController();

/**
 * @openapi
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

router.use(authMiddleware);

/**
 * @openapi
 * /wishlist:
 *   get:
 *     summary: Get user wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
 */
router.get('/', controller.getWishlist);

/**
 * @openapi
 * /wishlist/items:
 *   post:
 *     summary: Add an item to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Item added to wishlist
 */
router.post('/items', validate(addToWishlistSchema), controller.addItem);

/**
 * @openapi
 * /wishlist/items/{productId}:
 *   delete:
 *     summary: Remove an item from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Item removed from wishlist
 */
router.delete('/items/:productId', validate(removeWishlistItemSchema), controller.removeItem);

export default router;
