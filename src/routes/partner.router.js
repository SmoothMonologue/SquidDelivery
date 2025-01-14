import { Router } from 'express';
import partnerRestaurantRouter from './partner/partner.router.js';
import menuRouter from './partner/menu.router.js';
import ordersRouter from './partner/orders.router.js';
import commentRouter from './partner/comment.router.js';

const router = Router();

router.use('/restaurants', partnerRestaurantRouter);
router.use('/menu', menuRouter);
router.use('/orders', ordersRouter);
router.use('/comments', commentRouter);

export default router;
