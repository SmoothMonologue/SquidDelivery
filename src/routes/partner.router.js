import express from 'express';
import restaurantsRouter from './partner/restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import reviewRouter from './partner/review.router.js';
import ordersRouter from './partner/order.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/restaurants', restaurantsRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/review', reviewRouter);
partnerRouter.use('/orders', ordersRouter);

export default partnerRouter;
