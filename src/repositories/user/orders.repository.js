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

  createTransaction = async (userId, cart, priceSum, menuName) => {
    return await prisma.$transaction(async (tx) => {
      //결제api

      const order = await tx.order.update({
        where: {
          cartId: cart.id,
        },
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: priceSum,
          status: '주문 요청',
          menuName: menuName,
        },
      });
      return order;
    });
  };

  cancelOrderTransaction = async (orderId) => {
    return await prisma.$transaction(async (tx) => {
      //결제취소 api

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
