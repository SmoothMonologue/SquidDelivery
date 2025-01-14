import UserRestaurantService from '../../services/user/user.restaurants.service.js';

class UserRestaurantController {
  async getRestaurantMenus(req, res, next) {
    try {
      const restaurants = await this.#service.getAllRestaurants();
      res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserRestaurantController(UserRestaurantService);
