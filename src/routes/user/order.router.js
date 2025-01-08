import express from 'express';
import authorization from '';

const ordersRouter = express.Router();

//메뉴 주문
ordersRouter.post('/', authorization, (req, res) => {
  return res.status(201).json({ message: '메뉴를 주문했습니다.' });
});

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authorization, (req, res) => {
  return res.status(200).json({ message: '주문이 취소되었습니다.' });
});

export default ordersRouter;
