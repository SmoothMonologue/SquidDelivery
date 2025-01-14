import express from 'express';
import restaurantRouter from './partner/restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import reviewRouter from './user/review.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/restaurants', restaurantRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/reviews', reviewRouter);

export default partnerRouter;
