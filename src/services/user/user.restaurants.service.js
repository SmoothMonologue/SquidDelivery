import userRestaurantsRepository from '../../repositories/user/user.restaurants.repository.js';

class UserRestaurantService {
  async getAllRestaurants() {
    const restaurants = await userRestaurantsRepository.findAllRestaurants();
    if (!restaurants || restaurants.length === 0) {
      throw new Error('등록된 업장이 없습니다.');
    }
    return restaurants;
  }
}

export default new UserRestaurantService();
