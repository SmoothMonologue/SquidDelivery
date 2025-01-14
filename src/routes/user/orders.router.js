import express from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import orderController from '../../controllers/user/orders.controller.js';

const ordersRouter = express.Router();

//메뉴 주문
ordersRouter.post('/', authenticateUser, orderController.postOrder);

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authenticateUser, orderController.cancelOrder);

export default ordersRouter;
