import { Router } from 'express';
import { ProductController } from './product.controller';
import { validate } from '../../shared/middleware/validate';
import { authMiddleware, optionalAuthMiddleware } from '../../shared/middleware/auth.middleware';
import { adminMiddleware } from '../../shared/middleware/admin.middleware';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  productSlugParamSchema,
  addProductImageSchema,
  deleteProductImageSchema,
  getAllProductsSchema,
} from './product.dto';

const router = Router();
const controller = new ProductController();

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Product catalog management and retrieval
 */

// Public routes

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A paginated list of products
 */
router.get('/', validate(getAllProductsSchema), controller.getAll);

/**
 * @openapi
 * /products/{slug}:
 *   get:
 *     summary: Get a single product by its slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:slug', optionalAuthMiddleware, validate(productSlugParamSchema), controller.getBySlug);

// Admin routes
router.use(authMiddleware, adminMiddleware);
router.post('/', validate(createProductSchema), controller.create);
router.patch('/:id', validate(updateProductSchema), controller.update);
router.delete('/:id', validate(productIdParamSchema), controller.delete);
router.post('/:id/images', validate(addProductImageSchema), controller.addImage);
router.delete('/:id/images/:imgId', validate(deleteProductImageSchema), controller.deleteImage);

export default router;
