export class OrderRepository {
  #prisma;
  constructor(prisma) {
    this.#prisma = prisma;
  }
  findFirstRestaurant = async (partner) => {
    return await prisma.restaurant.findFirst({
      where: {
        partnerId: partner.id,
      },
    });
  };
  findManyOrder = async (restaurantInfo) => {
    const order = await prisma.order.findMany({
      where: { restaurantId: restaurantInfo.id },
      select: {
        id: true,
        userId: true,
        status: true,
        priceSum: true,
        menuName: true,
        createdAt: true,
      },
    });
    return order;
  };
  findFirstOrder = async (orderId, restaurant) => {
    return await prisma.order.findUnique({
      where: {
        id: +orderId,
        restaurantId: restaurant.id,
      },
    });
  };
  updateOrder = async (orderId, restaurant) => {
    return await prisma.order.update({
      where: {
        id: +orderId,
        restaurantId: restaurant.id,
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
          id: +orderId,
          restaurantId: restaurant.id,
        },
        data: { status: '주문 취소' },
      });
    });
  };
}