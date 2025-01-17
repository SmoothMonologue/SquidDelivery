import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class PartnerRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  createPartner = async ({ name, email, password, phoneNumber }) => {
    const existedPartner = await this.#orm.partner.findUnique({ where: { email } });

    if (existedPartner) {
      throw new CustomError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    return this.#orm.partner.create({
      data: { name, email, password, phoneNumber },
    });
  };
  signInPartner = async ({ email }) => {
    const partner = await this.#orm.partner.findUnique({ where: { email } });
    if (!partner) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.AUTH.SIGN_IN.FAILED);
    }

    return partner;
  };
}
