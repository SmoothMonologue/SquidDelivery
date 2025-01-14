import UserRestaurantRepository from '../../repositories/user/user.restaurants.repository.js';

class UserRestaurantService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async getAllRestaurants() {
    const restaurants = await this.#repository.getAllRestaurants();
    if (!restaurants || restaurants.length === 0) {
      throw new Error('등록된 업장이 없습니다.');
    }
    return restaurants;
  }

  // 키워드로 레스토랑 검색
  async searchRestaurantByKeyword(keyword) {
    //키워드 데이터 검증
    // trim을 이용해 String 데이터에서 공백을 없앤다
    if (!keyword || keyword.trim() === '') {
      return { message: '키워드를 입력해주세요.' };
    }

    // 레스토랑, 메뉴의 키워드와 검색 키워드가 부분 일치하는 레스토랑 조회
    const data = await this.#repository.findRestaurantByKeyword(keyword);

    // 조회 결과가 없을 경우
    if (data.length === 0) {
      return { message: '검색 결과가 없습니다.' };
    }

    // 클라이언트를 위한 조회 결과 재배치
    const newData = data.map((restaurant) => ({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }));
    return newData;
  }
}

export default new UserRestaurantService(UserRestaurantRepository);
