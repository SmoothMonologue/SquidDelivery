import menuRepository from '../../repositories/menu/menu.repository.js';

class Menuservice {
  #repository;

  constructor(menuRepository) {
    this.#repository = menuRepository;
  }
  createMenu = async ({ name, price, spicyLevel, restaurantId }) => {
    if (!name || price === undefined || restaurantId === undefined) {
      throw new Error('메뉴 이름, 가격, 레스토랑 ID는 필수입니다.');
    }
    const menu = this.#repository.menu({
      name,
      price,
      spicyLevel,
      restaurantId,
    });
    return menu;
  };
  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const menus = this.#repository.restaurantIdMenu({
      restaurantId,
    });
    return menus;
  };
  updateMenu = async ({ menuId, data }) => {
    const menu = this.#repository.updateMenu({
      menuId,
      data,
    });
    return menu;
  };

  deleteMenu = async ({ menuId }) => {
    const menu = this.#repository.deleteMenu({
      menuId,
    });
    return menu;
  };
}

export default new Menuservice(menuRepository);
