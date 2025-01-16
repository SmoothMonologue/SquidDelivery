// import { prisma } from '../../utils/prisma/index.js';

export default class ProfileRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  getProfile = async (id) => {
    return await this.#orm.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        interest: true,
        createdAt: true,
        updatedAt: true,
        cash: true,
        phoneNumber: true,
      },
    });
  };

  setProfile = async ({ id, profileData }) => {
    return await this.#orm.user.update({
      where: {
        id,
      },
      data: {
        name: profileData.name,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        interest: profileData.interest,
      },
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

// export default new profileRepository(prisma);
