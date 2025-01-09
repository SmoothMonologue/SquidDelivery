import express from 'express';
import { prisma } from '';
import authorization from '';

const ordersRouter = express.Router();

//메뉴 주문
ordersRouter.post('/', authorization, async (req, res) => {
  const userId = req.user;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: +userId },
    });
    if (!cart) {
      return res.status(404).json({ message: '장바구니를 찾을 수 없습니다.' });
    }

    const order = await prisma.$transaction(async (tx) => {
      //결제api

      return await tx.order.create({
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: cart.menuInfo.price, //수정필요
          status: '주문 요청',
          munuName, //수정필요
        },
      });
    });
    return res.status(201).json({ message: '메뉴를 주문했습니다.', order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '주문 처리 중 오류가 발생했습니다.' });
  }
});

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authorization, async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.$transaction(async (tx) => {
      //결제취소 api

      return await tx.order.update({
        where: { id: +orderId },
        data: { status: '주문 취소' },
      });
    });

    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    return res.status(200).json({ message: '주문이 취소되었습니다.', order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '주문 취소 중 오류가 발생했습니다.' });
  }
});

export default ordersRouter;
