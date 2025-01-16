import { Router } from 'express';
import partnerRestaurantRouter from './partner/partner.restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import ordersRouter from './partner/orders.router.js';
import commentRouter from './partner/comment.router.js';
import partnerInfoRouter from './partner/partnerInfo.router.js';

const router = Router();

router.use('/restaurants', partnerRestaurantRouter);
router.use('/menu', menuRouter);
router.use('/orders', ordersRouter);
router.use('/comments', commentRouter);
router.use('/', partnerInfoRouter);

export default router;
