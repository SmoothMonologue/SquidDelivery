import { prisma } from '../../utils/prisma/index.js';
import { MESSAGES } from '../../constants/message.constant.js';

class PartnerRestaurantRepository {
  async createRestaurant(data) {
    const requiredFields = {
      partnerId: data.partnerId,
      restaurantName: data.restaurantName,
    };
    return prisma.restaurant.create({
      data: {
        ...requiredFields,
        keyword: data.keyword,
        starRating: data.starRating,
      },
    });
  }

  async updateRestaurant(id, data) {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error(RESTAURANT_MESSAGES.NOT_FOUND);
    }
    return prisma.restaurant.update({ where: { id }, data });
  }

  async deleteRestaurant(id) {
    try {
      return await prisma.$transaction(async (tx) => {
        await tx.comment.deleteMany({
          where: {
            Review: { restaurantId: id },
          },
        });
        await tx.review.deleteMany({ where: { restaurantId: id } });
        await tx.cart.deleteMany({ where: { restaurantId: id } });
        await tx.menu.deleteMany({ where: { restaurantId: id } });
        return tx.restaurant.delete({ where: { id } });
      });
    } catch (error) {
      throw new Error(MESSAGES.RESTAURANTS.DELETE.ERROR);
    }
  }

  async findRestaurantsByPartnerId(partnerId) {
    return prisma.restaurant.findMany({ where: { partnerId } });
  }

  async findRestaurantById(id) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        restaurantName: true,
        partnerId: true,
      },
    });

    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return restaurant;
  }
}

export default new PartnerRestaurantRepository();
