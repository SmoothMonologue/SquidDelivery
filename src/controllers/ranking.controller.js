
export class RankingController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  getRanking = async (req, res) => {
    try {
      const data = await this.#service.getOrders();

      return res.status(data.status).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
}

