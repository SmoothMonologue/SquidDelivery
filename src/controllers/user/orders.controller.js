import orderService from '../../services/user/orders.services.js';

class OrderController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  postOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const { method } = req.body;
      const data = await this.#service.createOrder(userId, method);
      console.log(`-------------->`, data);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '주문 처리 중 오류가 발생했습니다.' });
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;

      const data = await this.#service.cancelOrder(orderId, userId);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '주문 취소 중 오류가 발생했습니다.' });
    }
  };
}

export default new OrderController(orderService);
