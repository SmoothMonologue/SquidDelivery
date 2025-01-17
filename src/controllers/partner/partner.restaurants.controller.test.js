import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { PartnerRestaurantController } from './partner.restaurants.controller.js';
import { jest } from '@jest/globals';

class MockPartnerRestaurantService {
  createRestaurant = jest.fn();
  getRestaurantsByPartner = jest.fn();
  verifyRestaurantOwnership = jest.fn();
  updateRestaurant = jest.fn();
  deleteRestaurant = jest.fn();
}

describe('PartnerRestaurantController', () => {
  let partnerRestaurantController;
  let mockPartnerRestaurantService;

  beforeEach(() => {
    mockPartnerRestaurantService = new MockPartnerRestaurantService();
    partnerRestaurantController = new PartnerRestaurantController(mockPartnerRestaurantService);
  });

  describe('createRestaurant', () => {
    it('should create a restaurant and return 201 status', async () => {
      const req = {
        partner: { id: 1 },
        body: { name: 'New Restaurant' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerRestaurantService.createRestaurant.mockResolvedValue({
        id: 1,
        name: 'New Restaurant',
      });

      await partnerRestaurantController.createRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.RESTAURANTS.CREATE.SUCCEED,
        data: { id: 1, name: 'New Restaurant' },
      });
    });

    it('should handle errors and call next with an error', async () => {
      const req = {
        partner: { id: 1 },
        body: { name: 'New Restaurant' },
      };

      const res = {};
      const next = jest.fn();

      mockPartnerRestaurantService.createRestaurant.mockRejectedValue(new Error('Database error'));

      await partnerRestaurantController.createRestaurant(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getRestaurants', () => {
    it('should return restaurants and return 200 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerRestaurantService.getRestaurantsByPartner.mockResolvedValue([
        { id: 1, name: 'Restaurant 1' },
      ]);

      await partnerRestaurantController.getRestaurants(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({ data: [{ id: 1, name: 'Restaurant 1' }] });
    });

    it('should handle errors and call next with an error', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {};
      const next = jest.fn();

      mockPartnerRestaurantService.getRestaurantsByPartner.mockRejectedValue(
        new Error('Database error'),
      );

      await partnerRestaurantController.getRestaurants(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant and return 200 status', async () => {
      const req = {
        params: { restaurantsId: 1 },
        partner: { id: 1 },
        body: { name: 'Updated Restaurant' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerRestaurantService.verifyRestaurantOwnership.mockResolvedValue();
      mockPartnerRestaurantService.updateRestaurant.mockResolvedValue({
        id: 1,
        name: 'Updated Restaurant',
      });

      await partnerRestaurantController.updateRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.RESTAURANTS.UPDATE.SUCCEED,
        data: { id: 1, name: 'Updated Restaurant' },
      });
    });

    it('should handle errors and call next with an error', async () => {
      const req = {
        params: { restaurantsId: 1 },
        partner: { id: 1 },
        body: { name: 'Updated Restaurant' },
      };

      const res = {};
      const next = jest.fn();

      mockPartnerRestaurantService.verifyRestaurantOwnership.mockResolvedValue();
      mockPartnerRestaurantService.updateRestaurant.mockRejectedValue(new Error('Database error'));

      await partnerRestaurantController.updateRestaurant(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant and return 200 status', async () => {
      const req = {
        params: { restaurantsId: 1 },
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerRestaurantService.verifyRestaurantOwnership.mockResolvedValue();
      mockPartnerRestaurantService.deleteRestaurant.mockResolvedValue();

      await partnerRestaurantController.deleteRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.RESTAURANTS.DELETE.SUCCEED,
      });
    });

    it('should handle errors and call next with an error', async () => {
      const req = {
        params: { restaurantsId: 1 },
        partner: { id: 1 },
      };

      const res = {};
      const next = jest.fn();

      mockPartnerRestaurantService.verifyRestaurantOwnership.mockResolvedValue();
      mockPartnerRestaurantService.deleteRestaurant.mockRejectedValue(new Error('Database error'));

      await partnerRestaurantController.deleteRestaurant(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
