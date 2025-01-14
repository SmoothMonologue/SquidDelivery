import menuService from '../../services/user/menu.service.js';

class Menucontrolleruser {
  #service;

  constructor(menuService) {
    this.#service = menuService;
  }

  // // 메뉴 목록 조회(소비자/사장님 공용)
  // getRestaurantMenus = async (req, res) => {
  //   try {
  //     console.log(req.params);
  //     const menus = await this.#service.restaurantIdMenu({ restaurantId: req.params.restaurantId });
  //     res.status(200).json(menus);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(400).send('메뉴 목록 조회 중 오류가 발생했습니다.');
  //   }
  // };
}

export default new Menucontrolleruser(menuService);
