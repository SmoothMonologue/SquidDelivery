import { prisma } from '../utils/prisma/index.js';

class PartnerRestaurantRepository {
  async createRestaurant(data) {
    return prisma.restaurant.create({ data });
  }

  async updateRestaurant(id, data) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
    }
    return prisma.restaurant.update({ where: { id }, data });
  }

  async deleteRestaurant(id) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
    }
    return prisma.restaurant.delete({ where: { id } });
  }

  async findRestaurantsByPartnerId(partnerId) {
    return prisma.restaurant.findMany({ where: { partnerId } });
  }
}

export default new PartnerRestaurantRepository();
