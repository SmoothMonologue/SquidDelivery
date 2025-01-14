import { MESSAGES } from '../../constants/message.constant.js';
import { prisma } from '../../utils/prisma/index.js';

class PartnerRestaurantRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async createRestaurant(data,id) {
    const requiredFields = {
      partnerId: id,
      restaurantName: data.restaurantName,
    };
    return this.#prisma.restaurant.create({
      data: {
        ...requiredFields,
        keyword: data.keyword,
        starRating: data.starRating,
        businessNumber: data.businessNumber,
        number: data.number,
      },
    });
  }

  async updateRestaurant(id, data) {
    const restaurant = await this.#prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return this.#prisma.restaurant.update({
      where: { id },
      data: {
        restaurantName: data.restaurantName,
        keyword: data.keyword,
        starRating: data.starRating,
        businessNumber: data.businessNumber,
        number: data.number,
      },
    });
  }

  async deleteRestaurant(id) {
    try {
      return await this.#prisma.$transaction(async (tx) => {
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
    return prisma.restaurant.delete({ where: { id } });
  }

  async findRestaurantsByPartnerId(partnerId) {
    return this.#prisma.restaurant.findUnique({ where: { partnerId } });
  }

  async findRestaurantById(id) {
    const restaurant = await this.#prisma.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        partnerId: true,
        restaurantName: true,
        keyword: true,
        starRating: true,
        createdAt: true,
        updatedAt: true,
        businessNumber: true,
        number: true,
      },
    });

    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return restaurant;
  }
}

export default new PartnerRestaurantRepository(prisma);
