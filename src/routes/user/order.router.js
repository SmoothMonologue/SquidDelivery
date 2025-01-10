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
    // menuInfo: {
    //   name: {
    //     [치킨, 피자, 탕수육];
    //   }
    //   price: {
    //     [2000, 5000, 2000];
    //   }
    // }
    const priceSum = cart.menuInfo.price.reduce((prev, current) => prev + current, 0); //장바구니 가격 합계
    const menuNames = cart.menuInfo.name; // 장바구니에서 메뉴 이름 배열 가져오기
    const menuName = menuNames.join(', '); // 배열을 문자열로 변환

    const order = await prisma.$transaction(async (tx) => {
      //결제api

      return await tx.order.create({
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: priceSum,
          status: '주문 요청',
          menuName: menuName,
        },
      });
    });
    return res.status(201).json({ message: '메뉴를 주문했습니다.', order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: '주문 처리 중 오류가 발생했습니다.' });
  }
});

//주문 취소 (사용자)
ordersRouter.post('/:orderId/status', authorization, async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user;
  try {
    const order = await prisma.$transaction(async (tx) => {
      //결제취소 api

      return await tx.order.update({
        where: { id: +orderId, userId: +userId },
        data: { status: '주문 취소' },
      });
    });

    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    const orderStatus = await tx.order.findUnique({
      where: { id: +orderId, userId: +userId },
      select: { status: true },
    });
    if (orderStatus.status !== '주문 요청') {
      return res.status(400).json({ message: '조리 중 입니다(취소 불가)' });
    }

    return res.status(200).json({ message: '주문이 취소되었습니다.', order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: '주문 취소 중 오류가 발생했습니다.' });
  }
});

export default ordersRouter;
