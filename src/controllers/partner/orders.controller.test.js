import { OrderController } from './orders.controller.js';
import { jest } from '@jest/globals';

class MockOrderService {
  getOrders = jest.fn();
  selectGetOrder = jest.fn();
  updateOrder = jest.fn();
  cancelOrder = jest.fn();
}

describe('OrderController', () => {
  let orderController;
  let mockOrderService;

  beforeEach(() => {
    mockOrderService = new MockOrderService();
    orderController = new OrderController(mockOrderService);
  });

  describe('getOrders', () => {
    it('should return orders for the partner and return 200 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.getOrders.mockResolvedValue({ status: 200, orders: [] });

      await orderController.getOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, orders: [] });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.getOrders.mockRejectedValue(new Error('Database error'));

      await orderController.getOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '서버 오류가 발생했습니다.' });
    });
  });

  describe('selectGetOrder', () => {
    it('should return a specific order and return 200 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.selectGetOrder.mockResolvedValue({ status: 200, order: {} });

      await orderController.selectGetOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, order: {} });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.selectGetOrder.mockRejectedValue(new Error('Database error'));

      await orderController.selectGetOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '서버 오류가 발생했습니다.' });
    });
  });

  describe('patchOrder', () => {
    it('should update an order and return 200 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
        body: { method: 'confirm' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.updateOrder.mockResolvedValue({ status: 200, message: 'Order updated' });

      await orderController.patchOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'Order updated' });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
        body: { method: 'confirm' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.updateOrder.mockRejectedValue(new Error('Database error'));

      await orderController.patchOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: '주문 접수 중 오류가 발생했습니다.' });
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order and return 200 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockOrderService.cancelOrder.mockResolvedValue({ status: 200, message: 'Order canceled' });

      await orderController.cancelOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 200, message: 'Order canceled' });
    });

    it('should handle errors and return 500 status', async () => {
      const req = {
        params: { orderId: 1 },
        partner: { id: 1 },
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
