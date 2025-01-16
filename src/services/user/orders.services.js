// import orderRepository from '../../repositories/user/orders.repository.js';

export class OrderService {
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

    const priceSum = cart.menuInfo.reduce((prev, current) => prev + current.price, 0); //장바구니 가격 합계
    // menuInfo 배열에서 각 객체의 name 속성을 추출하여 배열로 만듭니다.
    const menuNames = cart.menuInfo.map((item) => item.name);
    // join 메서드를 사용하여 배열을 문자열로 변환합니다.
    const menuName = menuNames.join(', ');

    // 결제 방식 검증
    if (!['cash'].includes(method)) {
      return {
        status: 400,
        message: `결제 방식은 'cash'만 가능합니다.)`,
      };
    }

    // 유저 캐시 확인
    const user = await this.#repository.findUser(userId);
    if (!user || user.cash < priceSum) {
      return {
        status: 400,
        message: '잔액이 부족합니다.',
      };
    }

    //유저ID의 카트의 레스토랑의 파트너 데이터를 조회
    const partnerData = await this.#repository.findPartner(userId);
    const partnerId = partnerData.id;

    const order = await this.#repository.createTransaction(
      userId,
      cart,
      priceSum,
      menuName,
      method,
      partnerId,
    );

    return {
      status: 201,
      message: '메뉴를 주문했습니다.',
      order,
    };
  };

  cancelOrder = async (orderId, userId) => {
    const orderStatus = await this.#repository.checkOrderStatus(orderId);

    if (orderStatus.status === '주문 취소') {
      return {
        status: 400,
        message: '이미 주문 취소 되었습니다.',
      };
    }

    if (orderStatus.status !== '주문 요청') {
      return {
        status: 400,
        message: '조리 중 이거나 배달상태 입니다(취소 불가)',
      };
    }

    //결제 환불
    const cart = await this.#repository.findCart(userId);
    const priceSum = cart.menuInfo.reduce((prev, current) => prev + current.price, 0);
    const partnerData = await this.#repository.findPartner(userId);
    const partnerId = partnerData.id;

    const order = await this.#repository.cancelOrderTransaction(
      orderId,
      userId,
      partnerId,
      priceSum,
    );

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

// export default new OrderService(orderRepository);
