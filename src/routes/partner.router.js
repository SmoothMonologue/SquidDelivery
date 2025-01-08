import express from 'express';
import restaurantsRouter from './partner/restaurants.router.js';
import menuRouter from './partner/menu.router.js';
import reviewRouter from './partner/review.router.js';

const partnerRouter = express.Router();

partnerRouter.use('/restaurants', restaurantsRouter);
partnerRouter.use('/menu', menuRouter);
partnerRouter.use('/review', reviewRouter);

export default partnerRouter;