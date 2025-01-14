import express from 'express';
import cartRouter from './user/cart.router.js';
import ordersRouter from './user/orders.router.js';
import reviewRouter from './user/review.router.js';
import restaurantsRouter from '../routes/user/user.restaurants.router.js';
import menuRouter from './partner/menu.router.js';

const userRouter = express.Router();

userRouter.use('/carts', cartRouter);
userRouter.use('/menu', menuRouter);
userRouter.use('/orders', ordersRouter);
userRouter.use('/reviews', reviewRouter);
userRouter.use('/restaurants', restaurantsRouter);

export default userRouter;
