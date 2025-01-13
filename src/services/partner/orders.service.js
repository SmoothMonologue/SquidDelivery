import orderRepository from '../../repositories/partner/orders.repository.js';

class OrderService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getOrder = async (partner, restaurant) => {
    const restaurant = await this.#repository.findUniqueRestaurant(partner);

    if (!restaurant) {
      return {
        status: 404,
        message: '업장을 찾을 수 없습니다.',
      };
    }

    const order = await this.#repository.findManyOrder(restaurant);
    return {
      status: 200,
      message: '주문 전체 조회 성공',
      order,
    };
  };

  selectGetOrder = async (orderId, partner) => {
    const restaurant = await this.#repository.findUniqueRestaurant(partner);

    if (!restaurant) {
      return {
        status: 404,
        message: '업장을 찾을 수 없습니다.',
      };
    }

    const order = await this.#repository.findUniqueOrder(orderId, restaurant);
    return {
      status: 200,
      message: '주문 선택 조회 성공',
      order,
    };
  };

  updateOrder = async (orderId, partner) => {
    const restaurant = await this.#repository.findUniqueRestaurant(partner);

    if (!restaurant) {
      return {
        status: 404,
        message: '업장을 찾을 수 없습니다.',
      };
    }

    const order = await this.#repository.findUniqueOrder(orderId, restaurant);
    if (!order) {
      return {
        status: 404,
        message: '주문을 찾을 수 없습니다.',
      };
    }
    await this.#repository.updateOrder(orderId, restaurant);

    return {
      status: 200,
      message: '주문이 접수되었습니다.',
      order,
    };
  };

  cancelOrder = async (orderId, partner) => {
    const restaurant = await this.#repository.findUniqueRestaurant(partner);

    if (!restaurant) {
      return {
        status: 404,
        message: '업장을 찾을 수 없습니다.',
      };
    }

    const order = await this.#repository.createTransaction(orderId, restaurant);

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
