import { OrderController } from './orders.controller.js';
import { jest } from '@jest/globals';

class MockOrderService {
  createOrder = jest.fn();
  cancelOrder = jest.fn();
}

describe('OrderController', () => {
  let orderController;
  let mockOrderService;

  beforeEach(() => {
    mockOrderService = new MockOrderService();
    orderController = new OrderController(mockOrderService);
  });

  describe('postOrder', () => {
    it('should create an order and return 200 status', async () => {
      const req = {
        user: { id: 1 },
        body: { method: 'credit_card' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = { status: 201, message: '주문이 생성되었습니다.', orderId: 123 };
      mockOrderService.createOrder.mockResolvedValue(mockData);

      await orderController.postOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        user: { id: 1 },
        body: { method: 'credit_card' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.createOrder.mockRejectedValue(new Error('Database error'));

      await orderController.postOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '주문 처리 중 오류가 발생했습니다.' });
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order and return 200 status', async () => {
      const req = {
        params: { orderId: 123 },
        user: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockData = { status: 200, message: '주문이 취소되었습니다.' };
      mockOrderService.cancelOrder.mockResolvedValue(mockData);

      await orderController.cancelOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        params: { orderId: 123 },
        user: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.cancelOrder.mockRejectedValue(new Error('Database error'));

      await orderController.cancelOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '주문 취소 중 오류가 발생했습니다.' });
    });
  });
});
