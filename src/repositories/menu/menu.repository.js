import { prisma } from '../../utils/prisma/index.js';

class menuRepository {
  #orm;
  constructor(prisma) {
    this.#orm = prisma;
  }

  createMenu = async ({ name, price, spicyLevel, restaurantId }) => {
    const menu = await this.#orm.menu.create({
      data: { name, price, spicyLevel, restaurantId },
    });
    return menu;
  };

  findRestaurantId = async ({ restaurantId }) => {
    const restaurantIdMenu = await this.#orm.menu.findMany({
      where: { restaurantId },
    });
    return restaurantIdMenu;
  };

  updateMenu = async ({ menuId, data }) => {
    const updateMenu = await this.#orm.menu.update({
      where: { menuId: Number(menuId) },
      data,
    });
    return updateMenu;
  };

  deleteMenu = async ({ menuId }) => {
    const deleteMenu = await this.#orm.menu.delete({
      where: { menuId: Number(menuId) },
    });
    return deleteMenu;
  };
}
export default new menuRepository(prisma);
