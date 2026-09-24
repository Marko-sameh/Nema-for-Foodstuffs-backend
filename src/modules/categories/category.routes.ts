import { Router } from 'express';
import { CategoryController } from './category.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema, categorySlugParamSchema, getAllCategoriesSchema } from './category.dto';

const router = Router();
const controller = new CategoryController();

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Category management and retrieval
 */

// Public routes

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of all active categories
 */
router.get('/', validate(getAllCategoriesSchema), controller.getAll);

/**
 * @openapi
 * /categories/{slug}:
 *   get:
 *     summary: Get a single category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get('/:slug', validate(categorySlugParamSchema), controller.getBySlug);

// Admin routes
router.use(authMiddleware, adminMiddleware);
router.post('/', validate(createCategorySchema), controller.create);
router.patch('/:id', validate(updateCategorySchema), controller.update);
router.delete('/:id', validate(categoryIdParamSchema), controller.delete);

export default router;
