import PartnerRestaurantService from '../../services/partner/partner.restaurants.service.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { RESTAURANT_MESSAGES } from '../../constants/message.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

class PartnerRestaurantController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // 업장 등록
  async createRestaurant(req, res, next) {
    try {
      const restaurant = await this.#service.createRestaurant(req.body);
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
      const restaurants = await this.#service.getRestaurantsByPartner(req.params.partnerId);
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

      await this.#service.verifyRestaurantOwnership(restaurantId, partnerId);

      const updatedRestaurant = await this.#service.updateRestaurant(restaurantId, req.body);
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

      await this.#service.verifyRestaurantOwnership(restaurantId, partnerId);

      await this.#service.deleteRestaurant(restaurantId);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESTAURANTS.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PartnerRestaurantController(PartnerRestaurantService);
