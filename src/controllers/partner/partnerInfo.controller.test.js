import { PartnerInfoController } from './partnerInfo.controller.js';
import { beforeEach, describe, expect, jest } from '@jest/globals';

class MockPartnerService {
  getPartnerInfo = jest.fn();
  updatePartnerInfo = jest.fn();
  deletePartnerInfo = jest.fn();
}

describe('PartnerInfoController', () => {
  let partnerInfoController;
  let mockPartnerService;

  beforeEach(() => {
    mockPartnerService = new MockPartnerService();
    partnerInfoController = new PartnerInfoController(mockPartnerService);
  });

  describe('getPartnerInfo', () => {
    it('should return partner info and return 200 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = {
        status: 200,
        data: { id: 1, name: 'Partner Name', phoneNumber: '123-456-7890' },
      };
      mockPartnerService.getPartnerInfo.mockResolvedValue(mockData);

      await partnerInfoController.getPartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerService.getPartnerInfo.mockRejectedValue(new Error('Database error'));

      await partnerInfoController.getPartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: '사장님 회원정보 불러오기중 오류가 발생했습니다.',
      });
    });
  });

  describe('updatePartnerInfo', () => {
    it('should update partner info and return 200 status', async () => {
      const req = {
        partner: { id: 1 },
        body: { name: 'Updated Name', phoneNumber: '987-654-3210' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = { status: 200, message: '회원정보가 수정되었습니다.' };
      mockPartnerService.updatePartnerInfo.mockResolvedValue(mockData);

      await partnerInfoController.updatePartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        partner: { id: 1 },
        body: { name: 'Updated Name', phoneNumber: '987-654-3210' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerService.updatePartnerInfo.mockRejectedValue(new Error('Database error'));

      await partnerInfoController.updatePartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: '사장님 회원정보 수정중 오류가 발생했습니다.',
      });
    });
  });

  describe('deletePartnerInfo', () => {
    it('should delete partner info and return 200 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = { status: 200, message: '회원탈퇴가 완료되었습니다.' };
      mockPartnerService.deletePartnerInfo.mockResolvedValue(mockData);

      await partnerInfoController.deletePartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockPartnerService.deletePartnerInfo.mockRejectedValue(new Error('Database error'));

      await partnerInfoController.deletePartnerInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '사장님 회원탈퇴중 오류가 발생했습니다.' });
    });
  });
});
