import express from 'express';
import authorization from '';

const ordersRouter = express.Router();

//매장 주문들 확인
ordersRouter.get('/', authorization, async (req, res) => {
  const partner = req.user;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        partnerId: partner.id,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: '업장을 찾을 수 없습니다.' });
    }

    const order = await prisma.order.findMany({
      where: {
        cart: {
          restaurantId: restaurant.id,
        },
      },
      select: {
        id: true,
        userId: true,
        cartId: true,
        priceSum: true,
        menuName: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

//주문한 메뉴 확인 (사장님)
ordersRouter.get('/:orderId', authorization, async (req, res) => {
  const { orderId } = req.params;
  const partner = req.user;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        partnerId: partner.id,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: '업장을 찾을 수 없습니다.' });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: +orderId,
        cart: {
          restaurantId: restaurant.id,
        },
      },
      select: {
        id: true,
        userId: true,
        cartId: true,
        priceSum: true,
        menuName: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

//주문 접수(수락) (사장님)
ordersRouter.patch('/:orderId/status', authorization, async (req, res) => {
  const { orderId } = req.params;
  const partner = req.user;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        partnerId: partner.id,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: '업장을 찾을 수 없습니다.' });
    }

    const order = await prisma.order.findUnique({
      where: { id: +orderId },
    });
    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }
    await prisma.order.update({
      where: {
        id: +orderId,
        cart: {
          restaurantId: restaurant.id,
        },
      },
      data: {
        status: '음식 조리 중',
      },
    });
    return res.status(200).json({ message: '주문이 접수되었습니다.', order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '주문 접수 중 오류가 발생했습니다.' });
  }
});

//주문 취소 (사장님)
ordersRouter.post('/:orderId/status', authorization, async (req, res) => {
  const { orderId } = req.params;
  const partner = req.user;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        partnerId: partner.id,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: '업장을 찾을 수 없습니다.' });
    }

    const order = await prisma.$transaction(async (tx) => {
      //결제취소 api

      return await tx.order.update({
        where: {
          id: +orderId,
          cart: {
            restaurantId: restaurant.id,
          },
        },
        data: { status: '주문 취소' },
      });
    });

    if (!order) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    return res.status(200).json({ message: '주문이 취소되었습니다.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '주문 취소 중 오류가 발생했습니다.' });
  }
});

export default ordersRouter;
