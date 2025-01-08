import express from 'express';
import cartsRouter from './user/cart.router.js';
import ordersRouter from './user/order.router.js';
import reviewRouter from './user/review.router.js';

const userRouter = express.Router();

userRouter.use('/carts', cartsRouter);
userRouter.use('/orders', ordersRouter);
userRouter.use('/review', reviewRouter);

export default userRouter;