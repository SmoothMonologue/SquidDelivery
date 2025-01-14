import orderRepository from '../../repositories/partner/orders.repository.js';

class OrderService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getOrders = async (partner) => {
    try {
      const restaurantInfo = await this.#repository.findUniqueRestaurant(partner);

      if (!restaurantInfo) {
        return {
          status: 404,
          message: '음식점이 존재하지 않습니다.',
        };
      }

      const orders = await this.#repository.findManyOrder(restaurantInfo);

      return {
        status: 200,
        message: '주문 조회에 성공했습니다.',
        data: orders,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: '주문 조회에 실패했습니다.',
      };
    }
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
