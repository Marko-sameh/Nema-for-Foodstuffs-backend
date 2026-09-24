import { Router } from 'express';
import { OrderController } from './order.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { createOrderSchema, updateOrderStatusSchema, orderIdParamSchema, paginationQuerySchema } from './order.dto';

const router = Router();
const controller = new OrderController();

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Order placement and management
 */

router.use(authMiddleware);

// User routes
/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: string
 *                 format: uuid
 *               couponCode:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', validate(createOrderSchema), controller.createOrder);

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of user's orders
 */
router.get('/', validate(paginationQuerySchema), controller.getUserOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
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
 *         description: Order details
 */
router.get('/:id', validate(orderIdParamSchema), controller.getOrderById);

/**
 * @openapi
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
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
 *         description: Order cancelled
 */
router.patch('/:id/cancel', validate(orderIdParamSchema), controller.cancelOrder);

// Admin routes (mounted under /api/admin/orders in main router, or handled here with explicit paths)
/**
 * @openapi
 * /orders/admin/all:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of all orders
 */
router.get('/admin/all', adminMiddleware, validate(paginationQuerySchema), controller.getAllOrders);

/**
 * @openapi
 * /orders/admin/{id}:
 *   get:
 *     summary: Get order details (Admin only)
 *     tags: [Orders]
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
 *         description: Order details
 */
router.get('/admin/:id', adminMiddleware, validate(orderIdParamSchema), controller.adminGetOrderById);

/**
 * @openapi
 * /orders/admin/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
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
 *                 enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.patch('/admin/:id/status', adminMiddleware, validate(updateOrderStatusSchema), controller.updateOrderStatus);

export default router;
