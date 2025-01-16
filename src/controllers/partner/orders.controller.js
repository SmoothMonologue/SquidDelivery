
export class OrderController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getOrders = async (req, res) => {
    try {
      const partner = req.partner.id;

      const data = await this.#service.getOrders(partner);
      return res.status(data.status).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  selectGetOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const partner = req.partner.id;

      const data = await this.#service.selectGetOrder(orderId, partner);
      return res.status(data.status).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  patchOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const partner = req.partner.id;
      const { method } = req.body;
      const data = await this.#service.updateOrder(orderId, partner, method);
      return res.status(data.status).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '주문 접수 중 오류가 발생했습니다.' });
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const partner = req.partner.id;

      const data = await this.#service.cancelOrder(orderId, partner);

      return res.status(data.status).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '주문 취소 중 오류가 발생했습니다.' });
    }
  };
}

