import menuService from '../../services/partner/menu.service.js';
class Menucontrollerpartner {
  #service;

  constructor(menuService) {
    this.#service = menuService;
  }

  // 메뉴 등록(사장님용)
  createMenu = async (req, res) => {
    try {
      const menu = await this.#service.createMenu(req.body);
      res.status(201).json(menu);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('메뉴 등록 중 오류가 발생했습니다.');
    }
  };

  // 메뉴 목록 조회(소비자/사장님 공용)
  getRestaurantMenus = async (req, res) => {
    try {
      // console.log(req.params);
      const menus = await this.#service.restaurantIdMenu({ restaurantId: req.params.restaurantId });
      res.status(200).json(menus);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('메뉴 목록 조회 중 오류가 발생했습니다.');
    }
  };

  // 메뉴 수정(사장님용)
  updateMenu = async (req, res) => {
    try {
      const updatedMenu = await this.#service.updateMenu({
        menuId: req.params.menuId,
        data: req.body,
      });
      res.status(200).json(updatedMenu);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('메뉴 수정 중 오류가 발생했습니다.');
    }
  };

  // 메뉴 삭제(사장님용)
  deleteMenu = async (req, res) => {
    try {
      await this.#service.deleteMenu({ menuId: req.params.menuId });
      res.status(200).send(`메뉴 ${req.params.menuId}가 삭제되었습니다.`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('메뉴 삭제 중 오류가 발생했습니다.');
    }
  };
}

export default new Menucontrollerpartner(menuService);
