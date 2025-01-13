import { prisma } from '../utils/prisma/index.js';

class UserRestaurantRepository {
  async findAllRestaurants() {
    return prisma.restaurant.findMany({
      include: {
        Menu: true,
      },
    });
  }

  async findRestaurantById(id) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: { Menu: true },
    });
    if (!restaurant) {
      throw new Error('해당 업장을 찾을 수 없습니다.');
    }
    return restaurant;
  }
}

export default new UserRestaurantRepository();
