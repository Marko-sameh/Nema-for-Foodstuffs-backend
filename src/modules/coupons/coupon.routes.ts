import { Router } from 'express';
import { CouponController } from './coupon.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { createCouponSchema, updateCouponSchema, validateCouponSchema, couponIdParamSchema } from './coupon.dto';

const router = Router();
const controller = new CouponController();

/**
 * @openapi
 * tags:
 *   name: Coupons
 *   description: Coupon management and validation
 */

router.use(authMiddleware);

// User routes
/**
 * @openapi
 * /coupons/validate:
 *   post:
 *     summary: Validate a coupon code
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon validated successfully
 */
router.post('/validate', validate(validateCouponSchema), controller.validate);

// Admin routes
router.use('/admin', adminMiddleware);

/**
 * @openapi
 * /coupons/admin:
 *   get:
 *     summary: Get all coupons (Admin only)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons
 */
router.get('/admin', controller.getAll);

/**
 * @openapi
 * /coupons/admin:
 *   post:
 *     summary: Create a new coupon (Admin only)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - discountValue
 *             properties:
 *               code:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [PERCENTAGE, FIXED]
 *               discountValue:
 *                 type: number
 *     responses:
 *       201:
 *         description: Coupon created
 */
router.post('/admin', validate(createCouponSchema), controller.create);

/**
 * @openapi
 * /coupons/admin/{id}:
 *   patch:
 *     summary: Update a coupon (Admin only)
 *     tags: [Coupons]
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
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Coupon updated
 */
router.patch('/admin/:id', validate(updateCouponSchema), controller.update);

/**
 * @openapi
 * /coupons/admin/{id}:
 *   delete:
 *     summary: Delete a coupon (Admin only)
 *     tags: [Coupons]
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
 *         description: Coupon deleted
 */
router.delete('/admin/:id', validate(couponIdParamSchema), controller.delete);

export default router;
