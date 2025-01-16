
export class OrderRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  findCart = async (userId) => {
    return await this.#prisma.cart.findFirst({
      where: { userId: +userId }, 
    });
  };

  // 유저ID가 일치하는 데이터 조회
  findUser = async (userId) => {
    return await this.#prisma.user.findUnique({ where: { id: userId } });
  };

  //유저ID의 카트의 레스토랑의 파트너 데이터를 조회
  findPartner = async (userId) => {
    return await this.#prisma.cart.findFirst({
      where: { userId: +userId },
      include: {
        Restaurant: {
          include: {
            Partner: true,
          },
        },
      },
    });
  };

  createTransaction = async (userId, cart, priceSum, menuName, method, partnerId) => {
    return await this.#prisma.$transaction(async (tx) => {
      //결제api
      // 사용자 캐시 차감
      await tx.user.update({
        where: { id: userId },
        data: {
          cash: { decrement: priceSum },
        },
      });

      // 파트너 캐시 증감
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
          // status: '결제',
        },
      });

      await tx.restaurant.update({
        where: {
          id: cart.restaurantId,
        },
        data: {
          sales: { increment: priceSum },
        },
      });

      return order;
    });
  };

  cancelOrderTransaction = async (orderId, userId, partnerId, priceSum) => {
    return await this.#prisma.$transaction(async (tx) => {
      //결제취소 api
      // 유저 캐시 환불
      await tx.user.update({
        where: { id: userId },
        data: {
          cash: { increment: priceSum },
        },
      });

      // 파트너 캐시 차감
      await tx.partner.update({
        where: { id: partnerId },
        data: {
          cash: { decrement: priceSum },
        },
      });

      //매출액 차감
      await tx.restaurant.update({
        where: { partnerId: partnerId },
        data: {
          sales: { decrement: priceSum },
        },
      });
      // 결제 정보 저장
      // await tx.payment.update({
      //   where: { id: +orderId },
      //   data: { status: '환불' },
      // });

      return await tx.order.update({
        where: { id: +orderId },
        data: { status: '주문 취소' },
      });
    });
  };

  checkOrderStatus = async (orderId) => {
    return await this.#prisma.order.findFirst({
      where: { id: +orderId },
      select: { status: true },
    });
  };
}

