import express from 'express';
import restaurantRouter from './partner/restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import commentRouter from './partner/comment.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/restaurants', restaurantRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/comments', commentRouter);

export default partnerRouter;
