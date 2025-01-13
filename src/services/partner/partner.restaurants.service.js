import PartnerRestaurantRepository from '../repositories/partner.restaurant.repository.js';

class PartnerRestaurantService {
  async createRestaurant(data) {
    return PartnerRestaurantRepository.createRestaurant(data);
  }

  async updateRestaurant(id, data) {
    return PartnerRestaurantRepository.updateRestaurant(id, data);
  }

  async deleteRestaurant(id) {
    await PartnerRestaurantRepository.deleteRestaurant(id);
  }

  async getRestaurantsByPartner(partnerId) {
    return PartnerRestaurantRepository.findRestaurantsByPartnerId(partnerId);
  }
}

export default new PartnerRestaurantService();
