export class Menurepository {
  #orm;
  constructor(prisma) {
    this.#orm = prisma;
  }
  // 메뉴 등록(사장님용)
  createMenu = async (data) => {
    const menu = await this.#orm.menu.create({
      data: {
        name: data.name,
        price: Number(data.price),
        spicyLevel: Number(data.spicyLevel),
        restaurantId: Number(data.restaurantId),
      },
    });
    return menu;
  };
  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const restaurantIdMenu = await this.#orm.menu.findMany({
      where: {
        restaurantId: Number(restaurantId),
      },
    });
    return restaurantIdMenu;
  };

  getMenu = async (data) => {
    const Menu = await this.#orm.menu.findUniqe({
      where: {
        id: Number(data.menuId),
      },
    });
    return Menu;
  };

  // 메뉴 수정(사장님용)
  updateMenu = async (data) => {
    const updateMenu = await this.#orm.menu.update({
      where: {
        id: Number(data.menuId),
      },
      data: {
        name: data.name,
        price: Number(data.price),
        spicyLevel: Number(data.spicyLevel),
      },
    });
    return updateMenu;
  };
  // 메뉴 삭제(사장님용)
  deleteMenu = async (data) => {
    await this.#orm.menu.delete({
      where: {
        id: Number(data.menuId),
      },
    });
    return;
  };
}
