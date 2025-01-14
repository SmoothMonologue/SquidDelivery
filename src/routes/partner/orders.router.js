import express from 'express';
import ordersController from '../../controllers/partner/orders.controller.js';
import { authorization } from '../../middlewares/auth.middleware.js';

const ordersRouter = express.Router();

//매장 주문들 확인
ordersRouter.get('/', authorization, ordersController.getOrders);

//주문한 메뉴 확인 (사장님)
ordersRouter.get('/:orderId', authorization, ordersController.selectGetOrder);

//주문 접수(수락) (사장님)
ordersRouter.patch('/:orderId/status', authorization, ordersController.patchOrder);

//주문 취소 (사장님)
ordersRouter.post('/:orderId/status', authorization, ordersController.cancelOrder);

export default ordersRouter;
