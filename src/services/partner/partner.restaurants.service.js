import { MESSAGES } from '../../constants/message.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';

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
    const data = await this.#repository.findRestaurantsByPartnerId(partnerId);
    if (!data) {
      throw new Error('업장이 존재하지 않습니다.');
    }

    return data;
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

  // 메뉴 목록 조회(사장님)
  restaurantIdMenu = async (restaurantId) => {
    const data = await this.#repository.restaurantIdMenu(restaurantId);

    if (!data) {
      throw new Error('업장에 메뉴가 존재하지 않습니다.');
    }
    return data;
  };
}
