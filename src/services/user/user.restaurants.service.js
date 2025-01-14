import UserRestaurantRepository from '../../routes/user/user.restaurants.router.js';

class UserRestaurantService {
  async getAllRestaurants() {
    const restaurants = await UserRestaurantRepository.findAllRestaurants();
    if (!restaurants || restaurants.length === 0) {
      throw new Error('등록된 업장이 없습니다.');
    }
    return restaurants;
  }
}

export default new UserRestaurantService();
