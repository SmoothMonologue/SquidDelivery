import PartnerRestaurantRepository from '../../repositories/partner/partner.restaurants.repository.js';

class PartnerRestaurantService {
  async createRestaurant(data) {
    return PartnerRestaurantRepository.createRestaurant(data);
  }

  async updateRestaurant(id, data) {
    const restaurant = await PartnerRestaurantRepository.findRestaurantById(id);
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
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
}

export default new PartnerRestaurantService();
