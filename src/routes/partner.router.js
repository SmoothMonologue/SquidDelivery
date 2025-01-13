import express from 'express';
import commentRouter from './partner/comment.router.js';
import menuRouter from './partner/menu.router.js';
import ordersRouter from './partner/orders.router.js';
import restaurantRouter from './partner/restaurants.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/comments', commentRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/orders', ordersRouter);
partnerRouter.use('/restaurants', restaurantRouter);

export default partnerRouter;
