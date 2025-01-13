import express from 'express';
import restaurantRouter from './partner/restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import reviewRouter from './partner/review.router.js';
import ordersRouter from './partner/orders.router.js';
import commentRouter from './partner/comment.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/restaurants', restaurantRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/review', reviewRouter);
partnerRouter.use('/orders', ordersRouter);
partnerRouter.use('/reviews', reviewRouter);
partnerRouter.use('/comments', commentRouter);

export default partnerRouter;
