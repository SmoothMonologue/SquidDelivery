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
    const data = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            keyword: {
              contains: String(keyword), // 키워드 부분 일치하는 데이터 조회
            },
          },
          {
            Menu: {
              // 메뉴 테이블에서
              some: {
                // 하나의 레스토랑의 메뉴 중에서 하나라도 일치하면 참 일 때마다 레스토랑테이블 레코드 조회
                name: {
                  // 메뉴이름 데이터
                  contains: String(keyword), //키워드 부분 일부 일치하는 데이터 조회
                },
              },
            },
          },
        ],
      },
      distinct: ['id'], // 중복제거 -> 하나의 레스토랑에서 여러 메뉴가 키워드 일치할 수 있기 때문에 검색결과에서 같은 레스토랑이 보일 수 있다.
    });

    return data;
  };

  // 레스토랑 리뷰 조회
  findAllReviews = async (restaurantId) => {
    return this.#prisma.review.findMany({
      where: {
        restaurantId: restaurantId,
      },
      include: {
        Comment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };
}
