import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { validate } from '../../shared/middleware/validate';
import { initiatePaymentSchema, orderIdParamSchema } from './payment.dto';

const router = Router();
const controller = new PaymentController();

// TODO: add a signature-verified provider webhook (Stripe/Paymob) route here.

/**
 * @openapi
 * tags:
 *   name: Payments
 *   description: Payment initiation and retrieval
 */

// User routes
router.use(authMiddleware);

/**
 * @openapi
 * /payments/initiate:
 *   post:
 *     summary: Initiate a payment for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - method
 *             properties:
 *               orderId:
 *                 type: string
 *                 format: uuid
 *               method:
 *                 type: string
 *                 enum: [CASH, CARD, WALLET]
 *     responses:
 *       200:
 *         description: Payment initiated
 */
router.post('/initiate', validate(initiatePaymentSchema), controller.initiate);

/**
 * @openapi
 * /payments/{orderId}:
 *   get:
 *     summary: Get payments for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get('/:orderId', validate(orderIdParamSchema), controller.getOrderPayments);

export default router;
