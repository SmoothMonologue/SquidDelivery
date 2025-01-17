import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import ProfileController from './profile.controller.js';
import { jest } from '@jest/globals';

class MockProfileService {
  getProfile = jest.fn();
  setProfile = jest.fn();
  resign = jest.fn();
}

describe('ProfileController', () => {
  let profileController;
  let mockProfileService;

  beforeEach(() => {
    mockProfileService = new MockProfileService();
    profileController = new ProfileController(mockProfileService);
  });

  describe('getProfile', () => {
    it('should return user profile and status 201', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockProfile = { id: 1, name: 'John Doe' };
      mockProfileService.getProfile.mockResolvedValue(mockProfile);

      await profileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: mockProfile,
      });
    });

    it('should return 404 if profile not found', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockProfileService.getProfile.mockResolvedValue(null);

      await profileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.COMMON.NOT_FOUND,
      });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockProfileService.getProfile.mockRejectedValue(new Error('Database error'));

      await profileController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.READ_ME.FAILED,
      });
    });
  });

  describe('setProfile', () => {
    it('should update profile and return 200 status', async () => {
      const req = {
        user: { id: 1 },
        body: { name: 'Jane Doe' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await profileController.setProfile(req, res);

      expect(mockProfileService.setProfile).toHaveBeenCalledWith({ id: 1, profileData: req.body });
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.UPDATE.SUCCEED,
      });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        user: { id: 1 },
        body: { name: 'Jane Doe' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockProfileService.setProfile.mockRejectedValue(new Error('Database error'));

      await profileController.setProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.UPDATE.FAILED,
      });
    });
  });

  describe('resign', () => {
    it('should resign user and return 200 status', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockProfile = { id: 1, name: 'John Doe' };
      mockProfileService.getProfile.mockResolvedValue(mockProfile);
      await profileController.resign(req, res);

      expect(mockProfileService.resign).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.RESIGN.SUCCEED,
      });
    });

    it('should return 404 if profile not found during resign', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockProfileService.getProfile.mockResolvedValue(null);

      await profileController.resign(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.COMMON.NOT_FOUND,
      });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockProfileService.getProfile.mockResolvedValue({ id: 1 });
      mockProfileService.resign.mockRejectedValue(new Error('Database error'));

      await profileController.resign(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.USERS.RESIGN.FAILED,
      });
    });
  });
});
