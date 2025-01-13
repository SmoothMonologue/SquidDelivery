import UserRestaurantRepository from '../repositories/user.restaurant.repository.js';

class UserRestaurantService {
  async getAllRestaurants() {
    return UserRestaurantRepository.findAllRestaurants();
  }
}

export default new UserRestaurantService();
