import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { prisma } from '../../utils/prisma/index.js';

class PartnerRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  createPartner = async ({ name, email, password, phoneNumber }) => {
    const existedPartner = await this.#orm.partner.findUnique({ where: { email } });

    if (existedPartner) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    return this.#orm.partner.create({
      data: { name, email, password, phoneNumber },
    });
  };
  signInPartner = async ({ email }) => {
    const partner = await this.#orm.partner.findUnique({ where: { email } });
    // console.log('signInPartner ==', partner);
    if (!partner) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      };
    }

    return partner;
  };
}

export default new PartnerRepository(prisma);
