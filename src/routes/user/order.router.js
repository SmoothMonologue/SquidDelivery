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
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: cart.menuInfo.price, //수정필요
          status: '주문 요청',
          munuName,
        },
      });

      return order;
    });
    return res.status(201).json({ message: '메뉴를 주문했습니다.' });
  } catch (error) {}
});

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authorization, async (req, res) => {
  await prisma.$transaction(async (tx) => {});
  return res.status(200).json({ message: '주문이 취소되었습니다.' });
});

export default ordersRouter;
