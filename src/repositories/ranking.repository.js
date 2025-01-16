import { prisma } from '../../utils/prisma/index.js';

export class OrderRepository {
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
    });
  };
}

// export default new OrderRepository(prisma);
