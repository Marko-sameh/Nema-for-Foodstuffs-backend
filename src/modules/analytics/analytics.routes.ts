import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';

import { validate } from '../../shared/middleware/validate';
import { getSalesSchema, getTopProductsSchema } from './analytics.dto';

const router = Router();
const controller = new AnalyticsController();

/**
 * @openapi
 * tags:
 *   name: Analytics
 *   description: Store analytics and reporting
 */

router.use(authMiddleware, adminMiddleware);

/**
 * @openapi
 * /analytics/overview:
 *   get:
 *     summary: Get dashboard overview metrics (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview metrics
 */
router.get('/overview', controller.getOverview);

/**
 * @openapi
 * /analytics/sales:
 *   get:
 *     summary: Get sales data (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Sales report
 */
router.get('/sales', validate(getSalesSchema), controller.getSales);

/**
 * @openapi
 * /analytics/top-products:
 *   get:
 *     summary: Get top selling products (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Top products report
 */
router.get('/top-products', validate(getTopProductsSchema), controller.getTopProducts);

export default router;
