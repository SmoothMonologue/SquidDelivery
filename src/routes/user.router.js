import express from 'express';
import cartRouter from './user/cart.router.js';
import ordersRouter from './user/orders.router.js';
import reviewRouter from './user/review.router.js';
import userRestaurantRouter from './user/user.restaurants.router.js';
import profileRouter from './user/profile.router.js';

const userRouter = express.Router();

userRouter.use('/carts', cartRouter);
userRouter.use('/orders', ordersRouter);
userRouter.use('/reviews', reviewRouter);
userRouter.use('/restaurants', userRestaurantRouter);
userRouter.use('/profile', profileRouter);

export default userRouter;
