import { prisma } from '../../utils/prisma/index.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

class UserRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  createUser = async ({ name, email, password, interest }) => {
    const existedUser = await this.#orm.user.findUnique({ where: { email } });

    if (existedUser) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    return this.#orm.user.create({
      data: { name, email, password, interest },
    });
  };

  signInUser = async ({ email, password }) => {
    const user = await this.#orm.user.findUnique({ where: { email } });

    if (!user) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      };
    }

    return { email: user.email, password: user.password };
  };
}

export default new UserRepository(prisma);
