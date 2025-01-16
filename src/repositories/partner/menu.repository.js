// import { prisma } from '../../utils/prisma/index.js';

export class Menurepository {
  #orm;
  constructor(prisma) {
    this.#orm = prisma;
  }
  // 메뉴 등록(사장님용)
  createMenu = async ({ name, price, spicyLevel, restaurantId }) => {
    const menu = await this.#orm.menu.create({
      data: {
        name,
        price: Number(price),
        spicyLevel: Number(spicyLevel),
        restaurantId: Number(restaurantId),
      },
    });
    return menu;
  };
  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const restaurantIdMenu = await this.#orm.menu.findMany({
      where: {
        restaurantId: { equals: Number(restaurantId) },
      },
    });
    return restaurantIdMenu;
  };

  // 메뉴 수정(사장님용)
  updateMenu = async ({ menuId, data }) => {
    const updateMenu = await this.#orm.menu.update({
      where: {
        id: Number(menuId),
      },
      data: {
        name: data.name,
        price: Number(data.price),
        spicyLevel: Number(data.spicyLevel),
        restaurantId: Number(data.restaurantId),
      },
    });
    return updateMenu;
  };
  // 메뉴 삭제(사장님용)
  deleteMenu = async ({ menuId }) => {
    // console.log('메뉴아이디', menuId);
    const deleteMenu = await this.#orm.menu.delete({
      where: {
        id: Number(menuId),
      },
    });
    // console.log('메뉴아이디', menuId);
    return deleteMenu;
  };
}
// export default new Menurepository(prisma);
