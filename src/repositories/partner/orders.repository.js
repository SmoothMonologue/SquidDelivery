import { prisma } from '../../utils/prisma/index.js';

class OrderRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  findUniqueRestaurant = async (partner) => {
    return await prisma.restaurant.findUnique({
      where: {
        partnerId: partner.id,
      },
    });
  };

  findManyOrder = async (restaurant) => {
    return await prisma.order.findMany({
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
  };

  findUniqueOrder = async (orderId, restaurant) => {
    return await prisma.order.findUnique({
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
  };

  updateOrder = async (orderId, restaurant) => {
    return await prisma.order.update({
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
  };

  createTransaction = async (orderId, restaurant) => {
    return await prisma.$transaction(async (tx) => {
      //결제취소api

      return await tx.order.update({
        where: {
          id: orderId,
          cart: {
            restaurantId: restaurant.id,
          },
        },
        data: { status: '주문 취소' },
      });
    });
  };
}

export default new OrderRepository(prisma);
