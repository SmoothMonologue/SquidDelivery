import UserRestaurantService from '../services/user.restaurant.service.js';

class UserRestaurantController {
  async getAllRestaurants(req, res, next) {
    try {
      const restaurants = await UserRestaurantService.getAllRestaurants();
      res.status(200).json({ data: restaurants });
    } catch (error) {
      console.error(error); // 추가 로그
      res.status(500).json({ message: '업장 목록을 불러오는 데 실패했습니다.' });
    }
  }
}

export default new UserRestaurantController();
