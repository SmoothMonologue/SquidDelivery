import orderRepository from '../../repositories/user/orders.repository.js';

class OrderService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createOrder = async (userId) => {
    const cart = await this.#repository.findCart(userId);
    console.log(`--------------22>`,cart);
    if (!cart) {
      return {
        status: 404,
        message: '장바구니를 찾을 수 없습니다.',
      };
    }
    const priceSum = cart.menuInfo.reduce((prev, current) => prev + current.price, 0); //장바구니 가격 합계
    console.log(`--------------33>`,priceSum);
    // menuInfo 배열에서 각 객체의 name 속성을 추출하여 배열로 만듭니다.
    const menuNames = cart.menuInfo.map((item) => item.name);
    console.log(`--------------44>`,menuNames);
    // join 메서드를 사용하여 배열을 문자열로 변환합니다.
    const menuName = menuNames.join(', ');
    console.log(`--------------55>`,menuName);

    const order = await this.#repository.createTransaction(userId, cart, priceSum, menuName);
    console.log(`--------------66>`,order);
    return {
      status: 201,
      message: '메뉴를 주문했습니다.',
      order,
    };
  };

  cancelOrder = async (orderId) => {
    const orderStatus = await this.#repository.checkOrderStatus(orderId);
    if (orderStatus.status !== '주문 요청') {
      return {
        status: 400,
        message: '조리 중 이거나 배달상태 입니다(취소 불가)',
      };
    }

    const order = await this.#repository.cancelOrderTransaction(orderId);

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
