export class RankingRepository {
  #orm;
  constructor(orm) {
    this.#orm = orm;
  }

  getRanking = async () => {
    return await this.#orm.restaurant.findMany({
      orderBy: {
        sales: 'desc',
      },
      take: 5, // 최대 5개 항목만 가져오기
      select: {
        sales: true,
        restaurantName: true,
      },
    });
  };
}

// export default new OrderRepository(prisma);
