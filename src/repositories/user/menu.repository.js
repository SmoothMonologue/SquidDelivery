export class MenuRepository {
  #orm;
  constructor(prisma) {
    this.#orm = prisma;
  }

  // 메뉴 목록 조회 메서드 구현
  restaurantIdMenu = async ({ restaurantId }) => {
    return await this.#orm.menu.findMany({
      where: {
        restaurantId: { equals: Number(restaurantId) },
      },
    });
  };
}
