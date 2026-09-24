import { Router } from 'express';
import { ReviewController } from './review.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { createReviewSchema, updateReviewSchema, adminApproveReviewSchema, productIdParamSchema, reviewIdParamSchema } from './review.dto';

const router = Router();
const controller = new ReviewController();

/**
 * @openapi
 * tags:
 *   name: Reviews
 *   description: Product reviews and ratings
 */

// Public routes (mount requires careful routing since it's /api/products/:productId/reviews)
// We'll export this and mount it appropriately in routes/index.ts
/**
 * @openapi
 * /reviews/products/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of product reviews
 */
router.get('/products/:productId', validate(productIdParamSchema), controller.getProductReviews);

// User routes
router.use(authMiddleware);

/**
 * @openapi
 * /reviews/products/{productId}:
 *   post:
 *     summary: Create a review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */
router.post('/products/:productId', validate(createReviewSchema), controller.create);

/**
 * @openapi
 * /reviews/{id}:
 *   patch:
 *     summary: Update your review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 */
router.patch('/:id', validate(updateReviewSchema), controller.update);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete your review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Review deleted
 */
router.delete('/:id', validate(reviewIdParamSchema), controller.delete);

// Admin routes
/**
 * @openapi
 * /reviews/admin/{id}/approve:
 *   patch:
 *     summary: Approve or reject a review (Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Review status updated
 */
router.patch('/admin/:id/approve', adminMiddleware, validate(adminApproveReviewSchema), controller.approve);

export default router;
