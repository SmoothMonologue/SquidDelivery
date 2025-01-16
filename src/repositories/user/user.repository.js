import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class UserRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  createUser = async ({ email, password, name, interest, phoneNumber }) => {
    const existedUser = await this.#orm.user.findUnique({ where: { email } });

    if (existedUser) {
      throw new CustomError(HTTP_STATUS.CONFLICT, MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    return this.#orm.user.create({
      data: { email, password, name, interest, phoneNumber },
    });
  };

  signInUser = async ({ email }) => {
    const user = await this.#orm.user.findUnique({ where: { email } });

    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.AUTH.SIGN_IN.FAILED);
    }

    return user;
  };
}
