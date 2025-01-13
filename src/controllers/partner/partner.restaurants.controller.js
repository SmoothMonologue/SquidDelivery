import restaurantService from '../../services/partner/restaurant.service.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';

class PartnerRestaurantController {
  // 업장 등록
  async createRestaurant(req, res, next) {
    try {
      const partnerId = req.partner.id;
      const { restaurantName, keyword, starRating } = req.body;
      
      const restaurant = await restaurantService.createRestaurant(partnerId, {
        restaurantName,
        keyword,
        starRating: starRating || 0
      });

      res.status(HTTP_STATUS.CREATED).json({ 
        message: '업장 등록에 성공했습니다.', 
        data: restaurant 
      });
    } catch (error) {
      next(error);
    }
  }

  // 업장 목록 조회 (사장님용)
  async getRestaurants(req, res, next) {
    try {
      const restaurants = await restaurantService.getRestaurantsByPartner(req.partner.id);
      res.status(HTTP_STATUS.OK).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  // 업장 수정
  async updateRestaurant(req, res, next) {
    try {
      const updatedRestaurant = await restaurantService.updateRestaurant(
        req.params.restaurantsId,
        req.body,
      );
      res.status(HTTP_STATUS.OK).json({ 
        message: '업장 정보가 수정되었습니다.', 
        data: updatedRestaurant 
      });
    } catch (error) {
      next(error);
    }
  }

  // 업장 삭제
  async deleteRestaurant(req, res, next) {
    try {
      await restaurantService.deleteRestaurant(req.params.restaurantsId);
      res.status(HTTP_STATUS.OK).json({ 
        message: '업장이 삭제되었습니다.' 
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PartnerRestaurantController();
