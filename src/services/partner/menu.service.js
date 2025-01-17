import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class Menuservice {
  #repository;

  constructor(menuRepository) {
    this.#repository = menuRepository;
  }
  createMenu = async (data) => {
    if (!data.name || !data.price || !data.restaurantId) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.CREATE.MISSING_INFO);
    }
    const menu = await this.#repository.createMenu(data);
    return menu;
  };
  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const menus = this.#repository.restaurantIdMenu({
      restaurantId: +restaurantId,
    });
    return menus;
  };
  updateMenu = async ({ menuId, data }) => {
    const menu = this.#repository.updateMenu({
      menuId: +menuId,
      data,
    });
    return menu;
  };

  deleteMenu = async ({ menuId }) => {
    const menu = this.#repository.deleteMenu({
      menuId: +menuId,
    });
    return menu;
  };
}
