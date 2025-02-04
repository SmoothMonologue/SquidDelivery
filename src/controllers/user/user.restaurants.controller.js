export class UserRestaurantController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getAllRestaurants = async (req, res, next) => {
    try {
      const restaurants = await this.#service.getAllRestaurants();
      res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  };

  // 키워드 검색
  getRestaurantsByKeyword = async (req, res, next) => {
    try {
      // 키워드 쿼리
      const { keyword } = req.query;

      // 키워드 검색 서비스
      const data = await this.#service.getRestaurantsByKeyword(keyword);

      // 응답
      res.status(200).json({
        message: '검색 결과',
        data,
      });
    } catch (error) {
      res.status(500).json({ message: '업장 목록을 불러오는 데 실패했습니다.' });
      next(error);
    }
  };

  // 레스토랑 리뷰 조회
  getRestaurantReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const data = await this.#service.getReviews(restaurantId);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  };

  // 레스토랑 메뉴 조회
  getRestaurantMenu = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const data = await this.#service.getMenu(restaurantId);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  };
}
