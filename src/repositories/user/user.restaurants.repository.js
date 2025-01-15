import { prisma } from '../../utils/prisma/index.js';
import { MESSAGES } from '../../constants/message.constant.js';

class UserRestaurantRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async getAllRestaurants() {
    return this.#prisma.restaurant.findMany({
      select: {
        id: true,
        restaurantName: true,
        starRating: true,
        keyword: true,
        createdAt: true,
        number: true,
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

  async getAllRestaurantsById(id) {
    const restaurant = await this.#prisma.restaurant.findUniqe({
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

export default new UserRestaurantRepository(prisma);
