import express from 'express';
import authorization from '';

const ordersRouter = express.Router();

//메뉴 주문
ordersRouter.post('/menu/orders', authorization, (req, res) => {
  return res.status(201).json({ message: '메뉴를 주문했습니다.' });
});

//주문 메뉴 확인 (사장님)
ordersRouter.get('/partners/restaurants/menu/:orderId', (req, res) => {
  return res.status(200).json({ data: data });
});

//주문 접수 (수락)(사장님)
ordersRouter.patch('/partners/orders/:orderId/status', authorization, (req, res) => {
  return res.status(200).json({ message: '주문이 접수되었습니다.' });
});

//주문 취소 (사장님)
ordersRouter.post('/partners/orders/:orderId/status', authorization, (req, res) => {
  return res.status(200).json({ message: '주문이 취소되었습니다.' });
});

//주문 취소 (사용자)
ordersRouter.post('/users/orders/:orderId/status', authorization, (req, res) => {
  return res.status(200).json({ message: '주문이 취소되었습니다.' });
});

export default ordersRouter;
