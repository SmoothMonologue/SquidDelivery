import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class Menuservice {
  #repository;

  constructor(menuRepository) {
    this.#repository = menuRepository;
  }
  createMenu = async (data) => {
    if (!data.name || !data.price) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.CREATE.MISSING_INFO);
    }
    const menu = await this.#repository.createMenu(data);
    return menu;
  };

  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async (restaurantId) => {
    const menus = this.#repository.restaurantIdMenu({
      restaurantId: Number(restaurantId),
    });
    return menus;
  };

  getMenu = async (data) => {
    const menu = await this.#repository.getMenu(data);
    if (!menu) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.MENU.DELETE.NOT_FOUND);
    }
    if (data.restaurantId !== menu.restaurantId) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.DELETE.NOT_RESTAURANT_ID);
    }
    return menu;
  };

  updateMenu = async (data) => {
    const myRestaurantId = data.restaurantId;
    const menu = await this.#repository.updateMenu(data);
    if (!menu) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.MENU.UPDATE.NOT_FOUND);
    }
    if (myRestaurantId !== menu.restaurantId) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.UPDATE.NOT_RESTAURANT_ID);
    }
    return menu;
  };

  deleteMenu = async (data) => {
    await this.#repository.deleteMenu(data);
    return;
  };
}
