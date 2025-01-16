import PartnerRestaurantService from '../../services/partner/partner.restaurants.service.js';
import menuService from '../../services/partner/menu.service.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { RESTAURANT_MESSAGES } from '../../constants/message.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

export class PartnerRestaurantController {
  // 업장 등록
  async createRestaurant(req, res, next) {
    try {
      const { id } = req.partner;
      const restaurant = await PartnerRestaurantService.createRestaurant(req.body, id);
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
      const { id } = req.partner;
      const restaurants = await PartnerRestaurantService.getRestaurantsByPartner(id);
      res.status(HTTP_STATUS.OK).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  // 업장 수정
  async updateRestaurant(req, res, next) {
    try {
      const { restaurantsId } = req.params; // URL에서 전달된 restaurantId
      const partnerId = req.partner.id; // 인증된 파트너 ID

      // 디버깅 로그 추가
      console.log('Received restaurantId:', restaurantsId);
      console.log('Type of restaurantId:', typeof restaurantsId);

      // 소유권 검증
      await PartnerRestaurantService.verifyRestaurantOwnership(+restaurantsId, partnerId);

      // 업장 수정
      const updatedRestaurant = await PartnerRestaurantService.updateRestaurant(
        parseInt(+restaurantsId),
        req.body,
      );
      res.status(200).json({
        message: MESSAGES.RESTAURANTS.UPDATE.SUCCEED,
        data: updatedRestaurant,
      });
    } catch (error) {
      console.error('Error in updateRestaurant:', error);
      next(error);
    }
  }

  // 업장 삭제
  async deleteRestaurant(req, res, next) {
    try {
      // console.log(req.params);
      const { restaurantsId } = req.params;
      const partnerId = req.partner.id;
      // console.log(restaurantsId, partnerId);
      await PartnerRestaurantService.verifyRestaurantOwnership(+restaurantsId, partnerId);

      await PartnerRestaurantService.deleteRestaurant(+restaurantsId);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESTAURANTS.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  }

  // 본인 가게 메뉴 조회
  async getMenu(req, res, next) {
    try {
      const partnerId = req.partner.id;
      const restaurantData = await PartnerRestaurantService.getRestaurantsByPartner(partnerId);
      const restaurantId = restaurantData.id;
      const menus = await menuService.restaurantIdMenu({ restaurantId });

      res.status(HTTP_STATUS.OK).json({ data: menus });
    } catch (error) {
      next(error);
    }
  }
}

export default new PartnerRestaurantController();
