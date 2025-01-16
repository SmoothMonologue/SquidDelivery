export class OrderRepository {
  #prisma;
  constructor(prisma) {
    this.#prisma = prisma;
  }
  findFirstRestaurant = async (partner) => {


    return await this.#prisma.restaurant.findFirst({
      where: {
        partnerId: partner,
      },
    });
  };
  findManyOrder = async (restaurantInfo) => {
    const order = await this.#prisma.order.findMany({
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
    return await this.#prisma.order.findUnique({
      where: {
        id: +orderId,
        restaurantId: restaurant.id,
      },
    });
  };
  updateOrder = async (orderId, restaurant) => {
    return await this.#prisma.order.update({
      where: {
        id: +orderId,
        restaurantId: restaurant.id,
      },
      data: {
        status: '음식 조리 중',
      },
    });
  };
  findCart = async (user) => {
    return await this.#prisma.cart.findFirst({
      where: { userId: user.userId },
    });
  };
  createTransaction = async (partner, orderId, restaurant, user, priceSum) => {
    return await this.#prisma.$transaction(async (tx) => {
      // 유저 캐시 증가
      await tx.user.update({
        where: { id: Number(user.userId) },
        data: {
          cash: { increment: priceSum },
        },
      });

      // 파트너 캐시 감소
      await tx.partner.update({
        where: { id: Number(partner) },
        data: {
          cash: { decrement: priceSum },
        },
      });

      // 매출액 감소
      await tx.restaurant.update({
        where: { partnerId: Number(partner) },
        data: {
          sales: { decrement: priceSum },
        },
      });

      return await tx.order.update({
        where: {
          id: Number(orderId),
          restaurantId: restaurant.id,
        },
        data: { status: '주문 취소' },
      });
    });
  };
}
