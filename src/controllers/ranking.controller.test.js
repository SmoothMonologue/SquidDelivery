import { RankingController } from './ranking.controller.js';
import { jest } from '@jest/globals';

class MockRankingService {
  getRanking = jest.fn();
}

describe('RankingController', () => {
  let rankingController;
  let mockRankingService;

  beforeEach(() => {
    mockRankingService = new MockRankingService();
    rankingController = new RankingController(mockRankingService);
  });

  describe('getRanking', () => {
    it('should return ranking data and status from service', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = { status: 200, data: [{ id: 1, name: 'User A' }] };
      mockRankingService.getRanking.mockResolvedValue(mockData);

      await rankingController.getRanking(req, res);

      expect(mockRankingService.getRanking).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(mockData.status);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return a 500 status', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockRankingService.getRanking.mockRejectedValue(new Error('Database error'));

      await rankingController.getRanking(req, res);

      expect(mockRankingService.getRanking).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '서버 오류가 발생했습니다.' });
    });
  });
});
