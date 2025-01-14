import UserRestaurantService from '../../services/user/user.restaurants.service.js';

class UserRestaurantController {
  async getRestaurantMenus(req, res, next) {
    try {
      const restaurants = await UserRestaurantService.getAllRestaurants();
      res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  async getRestaurantsByKeyword(req, res, next) {
    try {
      // 키워드 쿼리
      const { keyword } = req.query;

      // 키워드 검색 서비스
      const data = await UserRestaurantService.getRestaurantsByKeyword(keyword);

      // 응답
      res.status(200).json({
        message: '검색 결과',
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '업장 목록을 불러오는 데 실패했습니다.' });
      next();
    }
  }
}

export default new UserRestaurantController();
