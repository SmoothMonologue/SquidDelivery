export class PartnerInfoController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  getPartnerInfo = async (req, res) => {
    try {
      const partner = req.partner;

      const data = await this.#service.getPartnerInfo(partner);

      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '사장님 회원정보 불러오기중 오류가 발생했습니다.' });
    }
  };

  updatePartnerInfo = async (req, res) => {
    try {
      const partnerInfo = req.partner;
      const { name, phoneNumber } = req.body;

      const data = await this.#service.updatePartnerInfo(partnerInfo, name, phoneNumber);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '사장님 회원정보 수정중 오류가 발생했습니다.' });
    }
  };

  deletePartnerInfo = async (req, res) => {
    try {
      const partnerInfo = req.partner;

      const data = await this.#service.deletePartnerInfo(partnerInfo);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: '사장님 회원탈퇴중 오류가 발생했습니다.' });
    }
  };
}
