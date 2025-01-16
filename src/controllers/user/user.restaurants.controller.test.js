import { UserRestaurantController } from './user.restaurants.controller.js';
import { jest } from '@jest/globals';

class MockRestaurantService {
  getAllRestaurants = jest.fn();
  getRestaurantsByKeyword = jest.fn();
}

describe('UserRestaurantController', () => {
  let userRestaurantController;
  let mockRestaurantService;

  beforeEach(() => {
    mockRestaurantService = new MockRestaurantService();
    userRestaurantController = new UserRestaurantController(mockRestaurantService);
  });

  describe('getAllRestaurants', () => {
    it('should return all restaurants and status 200', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRestaurants = [
        { id: 1, name: 'Restaurant A' },
        { id: 2, name: 'Restaurant B' },
      ];
      mockRestaurantService.getAllRestaurants.mockResolvedValue(mockRestaurants);

      await userRestaurantController.getAllRestaurants(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: mockRestaurants });
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {};
      const next = jest.fn();
      mockRestaurantService.getAllRestaurants.mockRejectedValue(new Error('Database error'));

      await userRestaurantController.getAllRestaurants(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getRestaurantsByKeyword', () => {
    it('should return restaurants by keyword and status 200', async () => {
      const req = {
        query: { keyword: 'Pizza' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = [{ id: 1, name: 'Pizza Place' }];
      mockRestaurantService.getRestaurantsByKeyword.mockResolvedValue(mockData);

      await userRestaurantController.getRestaurantsByKeyword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '검색 결과',
        data: mockData,
      });
    });

    it('should handle errors and return a 500 status', async () => {
      const req = {
        query: { keyword: 'Pizza' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      mockRestaurantService.getRestaurantsByKeyword.mockRejectedValue(new Error('Database error'));

      await userRestaurantController.getRestaurantsByKeyword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '업장 목록을 불러오는 데 실패했습니다.' });
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
