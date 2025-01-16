import { prisma } from '../../utils/prisma/index.js';
import { MESSAGES } from '../../constants/message.constant.js';

export class UserRestaurantRepository {
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
    const restaurant = await this.#prisma.restaurant.findUnique({
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

  // 키워드 가게-메뉴 검색
  getRestaurantsByKeyword = async (keyword) => {
    return await this.#prisma.restaurant.findMany({
      where: {
        OR: [
          {
            keyword: {
              contains: String(keyword),
            },
          },
          {
            Menu: {
              some: {
                name: {
                  contains: String(keyword),
                },
              },
            },
          },
        ],
      },
      distinct: ['id'],
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
  };

  // 레스토랑 리뷰 조회
  findReviews = async (restaurantId) => {
    const data = await this.#prisma.review.findMany({
      where: {
        restaurantId,
      },
      include: {
        Comment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return data;
  };

  // 레스토랑 리뷰 조회
  findMenu = async (restaurantId) => {
    const data = await this.#prisma.Menu.findMany({
      where: {
        restaurantId,
      },
    });
    return data;
  };
}
