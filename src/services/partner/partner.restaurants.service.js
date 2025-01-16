import { MESSAGES } from '../../constants/message.constant.js';

export class PartnerRestaurantService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async createRestaurant(data, id) {
    if (!data.restaurantName) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.REQUIRED_FIELDS);
    }
    return this.#repository.createRestaurant(data, id);
  }

  async updateRestaurant(id, data) {
    const restaurant = await this.#repository.findRestaurantById(id);
    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }
    return this.#repository.updateRestaurant(id, data);
  }

  async deleteRestaurant(id) {
    const restaurant = await this.#repository.findRestaurantById(id);
    if (!restaurant) {
      throw new Error('업장이 존재하지 않습니다.');
    }
    return this.#repository.deleteRestaurant(id);
  }

  async getRestaurantsByPartner(partnerId) {
    return this.#repository.findRestaurantsByPartnerId(partnerId);
  }

  async verifyRestaurantOwnership(restaurantId, partnerId) {
    const restaurant = await this.#repository.findRestaurantById(restaurantId);

    if (!restaurant) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }

    if (restaurant.partnerId !== partnerId) {
      throw new Error(MESSAGES.RESTAURANTS.COMMON.NO_PERMISSION);
    }
  }

  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const menus = this.#repository.restaurantIdMenu({
      restaurantId: +restaurantId,
    });
    return menus;
  };
}
