import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { OrderController } from '../../controllers/partner/orders.controller.js';
import { OrderRepository } from '../../repositories/partner/orders.repository.js';
import { OrderService } from '../../services/partner/orders.service.js';
import { prisma } from '../../utils/prisma/index.js';

const orderRepository = new OrderRepository(prisma);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

const ordersRouter = express.Router();

//매장 주문들 확인
ordersRouter.get('/', authenticatePartner, orderController.getOrders);

//주문한 메뉴 확인 (사장님)
ordersRouter.get('/:orderId', authenticatePartner, orderController.selectGetOrder);

//주문 접수(수락) (사장님)
ordersRouter.patch('/:orderId/status', authenticatePartner, orderController.patchOrder);

//주문 취소 (사장님)
ordersRouter.post('/:orderId/status', authenticatePartner, orderController.cancelOrder);

export default ordersRouter;
