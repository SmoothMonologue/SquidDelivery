import UserRestaurantService from '../../services/user/user.restaurants.service.js';

class UserRestaurantController {
  async getAllRestaurants(req, res, next) {
    try {
      const restaurants = await UserRestaurantService.getAllRestaurants();
      res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserRestaurantController();
