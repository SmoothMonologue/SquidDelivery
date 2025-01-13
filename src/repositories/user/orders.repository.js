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

  createTransaction = async (userId, cart, priceSum, menuName) => {
    return await prisma.$transaction(async (tx) => {
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
  };

  cancelOrder = async (orderId, userId, tx) => {
    if (tx) {
      //결제취소 api

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
