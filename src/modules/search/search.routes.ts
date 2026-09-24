import { Router } from 'express';
import { SearchController } from './search.controller';

import { validate } from '../../shared/middleware/validate';
import { searchSchema } from './search.dto';

const router = Router();
const controller = new SearchController();

/**
 * @openapi
 * tags:
 *   name: Search
 *   description: Global search functionality
 */

/**
 * @openapi
 * /search:
 *   get:
 *     summary: Search for products and categories
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/', validate(searchSchema), controller.search);

export default router;
