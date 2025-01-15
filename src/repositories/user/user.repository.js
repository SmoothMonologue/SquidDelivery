import { PrismaClient } from '@prisma/client';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

const prisma = new PrismaClient();

class UserRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  createUser = async ({ email, password, name, interest, phoneNumber }) => {
    const existedUser = await this.#orm.user.findUnique({ where: { email } });

    if (existedUser) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    return this.#orm.user.create({
      data: { email, password, name, interest, phoneNumber },
    });
  };

  signInUser = async ({ email }) => {
    const user = await this.#orm.user.findUnique({ where: { email } });

    if (!user) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      };
    }

    return user;
  };
}

export default new UserRepository(prisma);
