import express from 'express';
import authorization from '';

const ordersRouter = express.Router();

//주문한 메뉴 확인 (사장님)
ordersRouter.get('/:orderId', authorization, async (req, res) => {
  return res.status(200).json({ data: data });
});

//주문 접수(수락) (사장님)
ordersRouter.patch('/:orderId/status', authorization, async (req, res) => {
  return res.status(200).json({ message: '주문이 접수되었습니다.' });
});

//주문 취소 (사장님)
ordersRouter.post('/:orderId/status', authorization, async (req, res) => {
  await prisma.$transaction(async (tx) => {});
  return res.status(200).json({ message: '주문이 취소되었습니다.' });
});

export default ordersRouter;
