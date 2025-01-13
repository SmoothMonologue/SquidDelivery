import PartnerRestaurantService from '../services/partner.restaurant.service.js';

class PartnerRestaurantController {
  // 업장 등록
  async createRestaurant(req, res, next) {
    try {
      const restaurant = await PartnerRestaurantService.createRestaurant(req.body);
      res.status(201).json({ message: '업장 등록에 성공했습니다.', data: restaurant });
    } catch (error) {
      next(error);
    }
  }

  // 업장 목록 조회 (사장님용)
  async getRestaurants(req, res, next) {
    try {
      const restaurants = await PartnerRestaurantService.getRestaurantsByPartner(
        req.params.partnerId,
      );
      res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  // 업장 수정
  async updateRestaurant(req, res, next) {
    try {
      const updatedRestaurant = await PartnerRestaurantService.updateRestaurant(
        req.params.restaurantsId,
        req.body,
      );
      res.status(200).json({ message: '업장 정보가 수정되었습니다.', data: updatedRestaurant });
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: '업장이 존재하지 않습니다.' });
      } else {
        next(error);
      }
    }
  }

  // 업장 삭제
  async deleteRestaurant(req, res, next) {
    try {
      await PartnerRestaurantService.deleteRestaurant(req.params.restaurantsId);
      res.status(200).json({ message: '업장이 삭제되었습니다.' });
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: '업장이 존재하지 않습니다.' });
      } else {
        next(error);
      }
    }
  }
}

export default new PartnerRestaurantController();
