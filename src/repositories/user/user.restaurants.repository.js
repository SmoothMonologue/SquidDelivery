import { prisma } from '../utils/prisma/index.js';
import { RESTAURANT_MESSAGES } from '../../constants/message.constant.js';

class UserRestaurantRepository {
  async findAllRestaurants() {
    return prisma.restaurant.findMany({
      select: {
        id: true,
        restaurantName: true,
        starRating: true,
        keyword: true,
        Menu: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
  }

  async findRestaurantById(id) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        restaurantName: true,
        Menu: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return restaurant;
  }
}

export default new UserRestaurantRepository();
