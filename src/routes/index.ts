import { Router } from 'express';
import authRoutes from '../modules/auth';
import userRoutes from '../modules/users';
import addressRoutes from '../modules/addresses';
import categoryRoutes from '../modules/categories';
import weightOptionRoutes from '../modules/weight-options';
import productRoutes from '../modules/products';
import cartRoutes from '../modules/cart';
import orderRoutes from '../modules/orders';
import paymentRoutes from '../modules/payments';
import reviewRoutes from '../modules/reviews';
import wishlistRoutes from '../modules/wishlist';
import couponRoutes from '../modules/coupons';
import searchRoutes from '../modules/search';
import analyticsRoutes from '../modules/analytics';
import settingsRoutes from '../modules/settings';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/addresses', addressRoutes);
router.use('/categories', categoryRoutes);
router.use('/weight-options', weightOptionRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/coupons', couponRoutes);
router.use('/search', searchRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/settings', settingsRoutes);

export default router;
