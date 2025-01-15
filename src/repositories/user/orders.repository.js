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
    console.log('Creating order with:', { userId, cartId: cart.id, priceSum, menuName });
    
    return await this.#prisma.$transaction(async (tx) => {
      // 1. Order 생성 (totalPrice 제거)
      const order = await tx.order.create({
        data: {
          userId: Number(userId),
          cartId: Number(cart.id),
          priceSum: Number(priceSum),  // priceSum만 사용
          menuName,
          status: 'PENDING'
        }
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
