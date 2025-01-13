import { prisma } from '../../utils/prisma/index.js';

class OrderRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  findCart = async (userId) => {
    return await prisma.cart.findUnique({
      where: { userId: +userId },
    });
  };

  // 유저ID가 일치하는 데이터 조회
  findUser = async (userId) => {
    return await prisma.user.findUnique({ where: { id: userId } });
  };

  createTransaction = async (userId, cart, priceSum, menuName, method) => {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: priceSum,
          status: '주문 요청',
          menuName: menuName,
        },
      });

      //결제api
      // 유저 캐시 차감
      await tx.user.update({
        where: { id: userId },
        data: {
          cash: { decrement: priceSum },
        },
      });

      // 파트너 캐시 추가
      const partnerId = cart.Restaurant.Partner.id;
      await tx.partner.update({
        where: { id: partnerId },
        data: {
          cash: { increment: priceSum },
        },
      });

      // 결제 정보 저장
      await tx.payment.create({
        data: {
          orderId: order.id,
          method,
        },
      });

      return order;
    });
  };

  cancelOrder = async (orderId, userId, orderPrice, tx) => {
    if (tx) {
      //결제취소 api
      // 유저 캐시 환불
      await tx.user.update({
        where: { id: userId },
        data: {
          cash: { increment: orderPrice },
        },
      });

      // 파트너 캐시 차감
      const partnerId = cart.Restaurant.Partner.id;
      await tx.partner.update({
        where: { id: partnerId },
        data: {
          cash: { decrement: orderPrice },
        },
      });

      return await tx.order.update({
        where: { id: +orderId, userId: +userId },
        data: { status: '주문 취소' },
      });
    }
  };

  checkOrderStatus = async (orderId, userId) => {
    return await prisma.order.findUnique({
      where: { id: +orderId, userId: +userId },
      select: { status: true },
    });
  };
}

export default new OrderRepository(prisma);
