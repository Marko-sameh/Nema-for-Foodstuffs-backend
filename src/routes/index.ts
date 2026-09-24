import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import addressRoutes from '../modules/addresses/address.routes';
import categoryRoutes from '../modules/categories/category.routes';
import weightOptionRoutes from '../modules/weight-options/weight-option.routes';
import productRoutes from '../modules/products/product.routes';
import cartRoutes from '../modules/cart/cart.routes';
import orderRoutes from '../modules/orders/order.routes';
import paymentRoutes from '../modules/payments/payment.routes';
import reviewRoutes from '../modules/reviews/review.routes';
import wishlistRoutes from '../modules/wishlist/wishlist.routes';
import couponRoutes from '../modules/coupons/coupon.routes';
import searchRoutes from '../modules/search/search.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import settingsRoutes from '../modules/settings/settings.routes';

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
