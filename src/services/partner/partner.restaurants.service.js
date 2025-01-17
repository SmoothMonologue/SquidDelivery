import { MESSAGES } from '../../constants/message.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class PartnerRestaurantService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async createRestaurant(data, id) {
    if (!data.restaurantName) {
      throw new CustomError(HTTP_STATUS.CONFLICT, MESSAGES.RESTAURANTS.CREATE.DUPLICATED);
    }
    const restaurantUnique = await this.#repository.getMyRestaurant(id);
    if (restaurantUnique) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.RESTAURANTS.CREATE.HAVE_RESTAURANT);
    }

    const restaurantBusinessNum = await this.#repository.getRestaurantBysinessNum(data);

    if (restaurantBusinessNum) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.RESTAURANTS.CREATE.DUPLICATED_CELL);
    }

    return await this.#repository.createRestaurant(data, id);
  }

  async updateRestaurant(id, data) {
    const restaurant = await this.#repository.findRestaurantById(id);
    if (!restaurant) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.UPDATE.NOT_FOUND);
    }
    return await this.#repository.updateRestaurant(id, data);
  }

  async deleteRestaurant(id) {
    const restaurant = await this.#repository.findRestaurantById(id);
    if (!restaurant) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.DELETE.NOT_FOUND);
    }
    return await this.#repository.deleteRestaurant(id);
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
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    }

    if (restaurant.partnerId !== partnerId) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.RESTAURANTS.COMMON.NO_PERMISSION);
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
