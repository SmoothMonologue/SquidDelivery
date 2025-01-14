import { prisma } from '../../utils/prisma/index.js';

class Menurepository {
  #orm;
  constructor(prisma) {
    this.#orm = prisma;
  }
  // 메뉴 목록 조회(소비자/사장님 공용)
  restaurantIdMenu = async ({ restaurantId }) => {
    const restaurantIdMenu = await this.#orm.menu.findMany({
      where: {
        restaurantId: { equals: Number(restaurantId) },
      },
    });
    return restaurantIdMenu;
  };
}
export default new Menurepository(prisma);
