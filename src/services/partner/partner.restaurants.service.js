import PartnerRestaurantRepository from '../../repositories/partner/partner.restaurants.repository.js';
import { RESTAURANT_MESSAGES } from '../../constants/message.constant.js';

class PartnerRestaurantService {
  async createRestaurant(data) {
    // 필수 필드 검증
    if (!data.restaurantName) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.REQUIRED_FIELDS);
    }

    // 데이터 형식 검증
    if (typeof data.restaurantName !== 'string' || data.restaurantName.length < 2) {
      throw new Error('업장 이름은 2글자 이상이어야 합니다.');
    }

    return PartnerRestaurantRepository.createRestaurant(data);
  }

  async updateRestaurant(id, data) {
    const restaurant = await PartnerRestaurantRepository.findRestaurantById(id);
    if (!restaurant) {
      throw new Error(RESTAURANT_MESSAGES.NOT_FOUND);
    }
    return PartnerRestaurantRepository.updateRestaurant(id, data);
  }

  async deleteRestaurant(id) {
    const restaurant = await PartnerRestaurantRepository.findRestaurantById(id);
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
    }
    return PartnerRestaurantRepository.deleteRestaurant(id);
  }

  async getRestaurantsByPartner(partnerId) {
    return PartnerRestaurantRepository.findRestaurantsByPartnerId(partnerId);
  }

  async verifyRestaurantOwnership(restaurantId, partnerId) {
    const restaurant = await PartnerRestaurantRepository.findRestaurantById(restaurantId);

    if (!restaurant) {
      throw new Error(RESTAURANT_MESSAGES.NOT_FOUND);
    }

    if (restaurant.partnerId !== partnerId) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NO_PERMISSION);
    }
  }
}

export default new PartnerRestaurantService();
