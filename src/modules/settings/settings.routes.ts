import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { updateSettingsSchema } from './settings.dto';

const router = Router();
const controller = new SettingsController();

/**
 * @openapi
 * tags:
 *   name: Settings
 *   description: Global store settings
 */

// Public route to get store settings (e.g., shipping fee)
/**
 * @openapi
 * /settings:
 *   get:
 *     summary: Get public store settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Store settings details
 */
router.get('/', controller.getSettings);

// Admin route to update settings
/**
 * @openapi
 * /settings/admin:
 *   patch:
 *     summary: Update store settings (Admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flatShippingRate:
 *                 type: number
 *               freeShippingThreshold:
 *                 type: number
 *     responses:
 *       200:
 *         description: Store settings updated
 */
router.patch('/admin', authMiddleware, adminMiddleware, validate(updateSettingsSchema), controller.updateSettings);

export default router;
