import orderRepository from '../../repositories/user/orders.repository.js';

class OrderService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createOrder = async (userId, method) => {
    const cart = await this.#repository.findCart(userId);
    if (!cart) {
      return {
        status: 404,
        message: '장바구니를 찾을 수 없습니다.',
      };
    }

    const priceSum = cart.menuInfo.price.reduce((prev, current) => prev + current, 0); //장바구니 가격 합계
    const menuName = cart.menuInfo.name.join(', '); // 장바구니에서 메뉴 이름 배열을 문자열로 변환

    // 결제 방식 검증
    if (!['cash', 'card'].includes(method)) {
      return {
        status: 400,
        message: `결제 방식은 'cash' 또는 'card'만 가능합니다.)`,
      };
    }

    // 유저 캐시 확인
    const user = await this.#repository.findUser(userId);
    if (!user || user.cash < priceSum) {
      return res.status(400).json({ message: '잔액이 부족합니다.' });
    }

    const order = await this.#repository.createTransaction(
      userId,
      cart,
      priceSum,
      menuName,
      method,
    );
    return {
      status: 201,
      message: '메뉴를 주문했습니다.',
      order,
    };
  };

  cancelOrder = async (orderId, userId) => {
    const orderStatus = await this.#repository.checkOrderStatus(orderId, userId);
    if (orderStatus.status !== '주문 요청') {
      return {
        status: 400,
        message: '조리 중 이거나 배달상태 입니다(취소 불가)',
      };
    }
    const orderPrice = orderStatus.priceSum;
    const order = await prisma.$transaction(async (tx) => {
      await this.#repository.cancelOrder(orderId, userId, orderPrice, tx);
    });
    if (!order) {
      return {
        status: 404,
        message: '주문을 찾을 수 없습니다.',
      };
    }

    return {
      status: 200,
      message: '주문이 취소되었습니다.',
      order,
    };
  };
}

export default new OrderService(orderRepository);
