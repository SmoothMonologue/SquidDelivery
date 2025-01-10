import express from 'express';
import cartRouter from './user/cart.router.js';
import orderRouter from './user/order.router.js';
import reviewRouter from './user/review.router.js';

const userRouter = express.Router();

userRouter.use('/carts', cartRouter);
userRouter.use('/orders', orderRouter);
userRouter.use('/reviews', reviewRouter);

export default userRouter;
