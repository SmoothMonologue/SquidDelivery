import { MESSAGES } from '../../constants/message.constant.js';

export class PartnerRestaurantRepository {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async createRestaurant(data, id) {
    console.log('data : ', data);

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

  // 메뉴 목록 조회(사장님)
  restaurantIdMenu = async ({ restaurantId }) => {
    const restaurantIdMenu = await this.#prisma.menu.findMany({
      where: {
        restaurantId: { equals: Number(restaurantId) },
      },
    });
    return restaurantIdMenu;
  };
}
