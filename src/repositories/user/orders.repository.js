import { prisma } from '../../utils/prisma/index.js';

class OrderRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  findCart = async (userId) => {
    return await prisma.cart.findFirst({
      where: { userId: +userId },
    });
  };

  // 유저ID가 일치하는 데이터 조회
  findUser = async (userId) => {
    return await prisma.user.findUnique({ where: { id: userId } });
  };

  createTransaction = async (userId, cart, priceSum, menuName, method) => {
    return await prisma.$transaction(async (tx) => {
      //결제api
      // 사용자 캐시 차감
      await tx.user.update({
        where: { id: userId },
        data: {
          cash: { decrement: priceSum },
        },
      });

      // 파트너 캐시 증감
      const partnerId = cart.Restaurant.Partner.id; //await?
      await tx.partner.update({
        where: { id: partnerId },
        data: {
          cash: { increment: priceSum },
        },
      });

      const order = await tx.order.create({
        data: {
          userId: +userId,
          restaurantId: cart.restaurantId,
          priceSum: priceSum,
          status: '주문 요청',
          menuName: menuName,
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

  cancelOrderTransaction = async (orderId) => {
    return await prisma.$transaction(async (tx) => {
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
        where: { id: +orderId },
        data: { status: '주문 취소' },
      });
    });
  };

  checkOrderStatus = async (orderId) => {
    return await prisma.order.findFirst({
      where: { id: +orderId },
      select: { status: true },
    });
  };
}

export default new OrderRepository(prisma);
