import { Router } from 'express';
import { WeightOptionController } from './weight-option.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { createWeightOptionSchema, updateWeightOptionSchema, weightOptionIdParamSchema } from './weight-option.dto';

const router = Router();
const controller = new WeightOptionController();

/**
 * @openapi
 * tags:
 *   name: WeightOptions
 *   description: Global weight options and prices
 */

// Public routes

/**
 * @openapi
 * /weight-options:
 *   get:
 *     summary: Get all weight options
 *     tags: [WeightOptions]
 *     responses:
 *       200:
 *         description: List of weight options
 */
router.get('/', controller.getAll);

// Admin routes
router.use(authMiddleware, adminMiddleware);
router.post('/', validate(createWeightOptionSchema), controller.create);
router.patch('/:id', validate(updateWeightOptionSchema), controller.update);
router.delete('/:id', validate(weightOptionIdParamSchema), controller.delete);

export default router;
