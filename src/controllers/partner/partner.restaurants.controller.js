import PartnerRestaurantService from '../../services/partner/partner.restaurants.service.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { RESTAURANT_MESSAGES } from '../../constants/message.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

class PartnerRestaurantController {
  // 업장 등록
  async createRestaurant(req, res, next) {
    try {
      const{id} = req.partner
      const restaurant = await PartnerRestaurantService.createRestaurant(req.body,id);
      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.RESTAURANTS.CREATE.SUCCEED,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  }

  // 업장 목록 조회 (사장님용)
  async getRestaurants(req, res, next) {
    try {
      const{id} = req.partner
      const restaurants = await PartnerRestaurantService.getRestaurantsByPartner(
        id
      );
      res.status(HTTP_STATUS.OK).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  // 업장 수정
  async updateRestaurant(req, res, next) {
    try {
      const { restaurantId } = req.params;
      if (!req.user || !req.user.id) {
        throw new Error(RESTAURANT_MESSAGES.NO_PERMISSION);
      }
      const partnerId = req.user.id;

      await PartnerRestaurantService.verifyRestaurantOwnership(restaurantId, partnerId);

      const updatedRestaurant = await PartnerRestaurantService.updateRestaurant(
        restaurantId,
        req.body,
      );
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESTAURANTS.UPDATE.SUCCEED,
        data: updatedRestaurant,
      });
    } catch (error) {
      next(error);
    }
  }

  // 업장 삭제
  async deleteRestaurant(req, res, next) {
    try {
      const { restaurantId } = req.params;
      const partnerId = req.user.id;

      await PartnerRestaurantService.verifyRestaurantOwnership(restaurantId, partnerId);

      await PartnerRestaurantService.deleteRestaurant(restaurantId);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESTAURANTS.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PartnerRestaurantController();
