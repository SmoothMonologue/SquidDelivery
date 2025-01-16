
export class Menuservice {
  #repository;

  constructor(menuRepository) {
    this.#repository = menuRepository;
  }
  createMenu = async ({ name, price, spicyLevel, restaurantId }) => {
    if (!name || price === undefined || restaurantId === undefined) {
      throw new Error('메뉴 이름, 가격, 레스토랑 ID는 필수입니다.');
    }
    const menu = this.#repository.createMenu({
      name,
      price: +price,
      spicyLevel: +spicyLevel,
      restaurantId: +restaurantId,
    });
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

