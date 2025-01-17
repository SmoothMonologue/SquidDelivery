import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';

export class Menucontrollerpartner {
  #service;

  constructor(menuService) {
    this.#service = menuService;
  }

  // 메뉴 등록(사장님용)
  createMenu = async (req, res, next) => {
    try {
      const myRestaurantId = req.restaurant.id;
      const { name, price, spicyLevel, restaurantId } = req.body;

      console.log('myRestaurantId : ', myRestaurantId);
      console.log('restaurantId : ', restaurantId);
      if (myRestaurantId !== Number(restaurantId)) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.CREATE.NOT_MY_RESTAURANTS);
      }
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
      const menus = await this.#service.restaurantIdMenu(restaurantId);
      res.status(HTTP_STATUS.OK).json(menus);
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 수정(사장님용)
  updateMenu = async (req, res, next) => {
    try {
      const updatedMenu = await this.#service.updateMenu({
        menuId: req.params.menuId,
        data: req.body,
      });
      res.status(200).json(updatedMenu);
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 삭제(사장님용)
  deleteMenu = async (req, res, next) => {
    try {
      const menu = await this.#service.deleteMenu(req.params.menuId);
      res.status(200).send(`메뉴 ${req.params.menuId}가 삭제되었습니다.`);
    } catch (error) {
      next(error);
    }
  };
}
