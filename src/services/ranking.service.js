import rankingRepository from '../repositories/ranking.repository.js';

class RankingService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getRanking = async () => {
    try {
      const salesData = await this.#repository.getRanking();

      // 매출 순위 결과를 응답으로 보냅니다.
      const rankedSales = salesData.map((restaurant, index) => ({
        rank: index + 1,
        name: restaurant.name,
        sales: restaurant.sales,
      }));

      return { status: 200, message: '랭킹조회 성공', rankedSales };
    } catch (error) {
      return res.status(500).json({
        message: '랭킹 조회에 실패했습니다.',
      });
    }
  };
}

export default new RankingService(rankingRepository);
