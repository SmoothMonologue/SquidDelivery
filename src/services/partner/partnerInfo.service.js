export class PartnerInfoService {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  getPartnerInfo = async (partnerInfo) => {
    const partner = await this.#repository.getPartnerInfo(partnerInfo);
    if (!partner) {
      return {
        status: 404,
        message: '회원정보가 존재하지 않습니다',
      };
    }

    return {
      status: 200,
      message: '사장님 회원정보 불러오기 성공',
      partner,
    };
  };

  updatePartnerInfo = async (partnerInfo, name, phoneNumber) => {
    const currentPartner = this.#repository.updatePartnerInfo(partnerInfo, name, phoneNumber);
    if (!currentPartner) {
      return {
        status: 404,
        message: '회원정보가 존재하지 않습니다',
      };
    }

    return {
      status: 200,
      message: '사장님 회원정보 수정 성공',
    };
  };

  deletePartnerInfo = async (partnerInfo) => {
    const currentPartner = await this.#repository.getPartnerInfo(partnerInfo);
    if (!currentPartner) {
      return {
        status: 404,
        message: '회원정보가 존재하지 않습니다',
      };
    }
    await this.#repository.deletePartnerInfo(partnerInfo);
    return {
      status: 200,
      message: '사장님 회원탈퇴 성공',
    };
  };
}
