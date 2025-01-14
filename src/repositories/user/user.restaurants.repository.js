import { prisma } from '../../utils/prisma/index.js';

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

  // 키워드 가게-메뉴 검색
  async findRestaurantsByKeyword(keyword) {
    const data = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            keyword: {
              contains: keyword, // 키워드 부분 일치하는 데이터 조회
              mode: 'insensitive', // 대소문자 구분 없이
            },
          },
          {
            Menu: {
              // 메뉴 테이블에서
              some: {
                // 하나의 레스토랑의 메뉴 중에서 하나라도 일치하면 참 일 때마다 레스토랑테이블 레코드 조회
                name: {
                  // 메뉴이름 데이터
                  contains: keyword, //키워드 부분 일부 일치하는 데이터 조회
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      distinct: ['id'], // 중복제거 -> 하나의 레스토랑에서 여러 메뉴가 키워드 일치할 수 있기 때문에 검색결과에서 같은 레스토랑이 보일 수 있다.
    });
    return data;
  }
}

export default new UserRestaurantRepository();
