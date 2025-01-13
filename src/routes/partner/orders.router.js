import express from 'express';
import ordersController from '../../controllers/partner/orders.controller.js';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';

const ordersRouter = express.Router();

//매장 주문들 확인
ordersRouter.get('/', authenticatePartner, ordersController.getOrders);

//주문한 메뉴 확인 (사장님)
ordersRouter.get('/:orderId', authenticatePartner, ordersController.selectGetOrder);

//주문 접수(수락) (사장님)
ordersRouter.patch('/:orderId/status', authenticatePartner, ordersController.patchOrder);

//주문 취소 (사장님)
ordersRouter.post('/:orderId/status', authenticatePartner, ordersController.cancelOrder);

export default ordersRouter;
