import { prisma } from '../../utils/prisma/index.js';

class profileRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  getProfile = async (id) => {
    return await this.#orm.user.findById({
      where: {
        id,
      },
    });
  };

  setProfile = async ({ id, profileData }) => {
    return await this.#orm.user.update({
      where: {
        id,
      },
      data: { profileData },
    });
  };

  resign = async (id) => {
    return await this.#orm.user.delete({
      where: {
        id,
      },
    });
  };
}

export default new profileRepository(prisma);
