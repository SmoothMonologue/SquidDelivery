import express from 'express';
import { authorization } from '../../middlewares/auth.middleware.js';
import orderController from '../../controllers/user/orders.controller.js';

const ordersRouter = express.Router();

//메뉴 주문
ordersRouter.post('/', authorization, orderController.postOrder);

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authorization, orderController.cancelOrder);

export default ordersRouter;
