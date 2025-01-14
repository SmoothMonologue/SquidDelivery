import { MESSAGES } from '../../constants/message.constant.js';
import { prisma } from '../../utils/prisma/index.js';

class PartnerRestaurantRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createRestaurant = async (data) => {
    return this.#orm.restaurant.create({ data });
  };

  updateRestaurant = async (id, data) => {
    const restaurant = await this.#orm.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error(MESSAGES);
    }
    return prisma.restaurant.update({ where: { id }, data });
  };

  deleteRestaurant = async (id) => {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
    }
    return prisma.restaurant.delete({ where: { id } });
  };

  async findRestaurantsByPartnerId(partnerId) {
    return prisma.restaurant.findMany({ where: { partnerId } });
  }
}

export default new PartnerRestaurantRepository(prisma);
