export class PartnerInfoRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  getPartnerInfo = async (partnerInfo) => {
    return await this.#orm.partner.findUnique({
      where: { id: partnerInfo.id },
      select: {
        id: true,
        name: true,
        email: true,
        cash: true,
        phoneNumber: true,
      },
    });
  };

  updatePartnerInfo = async (partnerInfo, name, phoneNumber) => {
    return await this.#orm.partner.update({
      where: { id: partnerInfo.id },
      data: {
        name: name,
        phoneNumber: phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cash: true,
        phoneNumber: true,
      },
    });
  };

  deletePartnerInfo = async (partnerInfo) => {
    return await this.#orm.partner.delete({
      where: { id: partnerInfo.id },
    });
  };
}
