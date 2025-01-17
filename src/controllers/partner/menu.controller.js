import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class MenuControllerPartner {
  #service;

  constructor(menuService) {
    this.#service = menuService;
  }

  // 메뉴 등록(사장님용)
  createMenu = async (req, res, next) => {
    try {
      const restaurantId = req.restaurant.id;
      const { name, price, spicyLevel } = req.body;
      const menu = await this.#service.createMenu({ name, price, spicyLevel, restaurantId });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: MESSAGES.MENU.CREATE.SUCCEED, data: menu });
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 목록 조회(소비자/사장님 공용)
  getRestaurantMenus = async (req, res, next) => {
    try {
      const restaurantId = req.params.restaurantId;
      const myRestaurantId = req.restaurant.id;
      if (Number(restaurantId) !== myRestaurantId) {
        throw new CustomError(HTTP_STATUS.NOT_FOUND, MESSAGES.MENU.COMMON.NOT_RESTAURANT_ID);
      }
      const menus = await this.#service.restaurantIdMenu(restaurantId);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.MENU.COMMON.SUCCEED, data: menus });
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 수정(사장님용)
  updateMenu = async (req, res, next) => {
    try {
      const restaurantId = req.restaurant.id;
      const menuId = req.params.menuId;
      const { name, price, spicyLevel } = req.body;
      const updatedMenu = await this.#service.updateMenu({
        name,
        price,
        spicyLevel,
        restaurantId,
        menuId,
      });
      return res.status(HTTP_STATUS.OK).json(updatedMenu);
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 삭제(사장님용)
  deleteMenu = async (req, res, next) => {
    try {
      const menuId = req.params.menuId;
      const restaurantId = req.params.restaurantId;
      await this.#service.getMenu(menuId, restaurantId);
      await this.#service.deleteMenu(menuId, restaurantId);
      return res.status(200).send(`메뉴 ${req.params.menuId}가 삭제되었습니다.`);
    } catch (error) {
      next(error);
    }
  };
}
