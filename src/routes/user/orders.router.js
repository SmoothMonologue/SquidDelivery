import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { OrderController } from '../../controllers/user/orders.controller.js';
import { OrderRepository } from '../../repositories/user/orders.repository.js';
import { OrderService } from '../../services/user/orders.service.js';

const ordersRouter = express.Router();
const orderRepository = new OrderRepository(prisma);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

//메뉴 주문
ordersRouter.post('/', authenticateUser, orderController.postOrder);

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authenticateUser, orderController.cancelOrder);

export default ordersRouter;
