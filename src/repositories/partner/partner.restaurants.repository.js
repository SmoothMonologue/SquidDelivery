import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class PartnerRestaurantRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }
  async getMyRestaurant(id) {
    return this.#prisma.restaurant.findUnique({ where: { partnerId: id } });
  }

  async getRestaurantBysinessNum(data) {
    return this.#prisma.restaurant.findUnique({ where: { businessNumber: data.businessNumber } });
  }

  async createRestaurant(data, id) {
    return this.#prisma.restaurant.create({
      data: {
        ...data,
        partnerId: id,
      },
    });
  }

  async updateRestaurant(id, data) {
    const restaurant = await this.#prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
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
  }

  async findRestaurantsByPartnerId(partnerId) {
    return await this.#prisma.restaurant.findUnique({ where: { partnerId } });
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
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return restaurant;
  }

  // 메뉴 목록 조회(사장님)
  restaurantIdMenu = async (restaurantId) => {
    const data = await this.#prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });

    return data;
  };
}
