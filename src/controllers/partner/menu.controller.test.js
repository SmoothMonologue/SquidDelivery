import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { CustomError } from '../../middlewares/error-handler.middleware.js';
import { Menucontrollerpartner } from './menu.controller.js';
import { jest } from '@jest/globals';

class MockMenuService {
  createMenu = jest.fn();
  restaurantIdMenu = jest.fn();
  updateMenu = jest.fn();
  deleteMenu = jest.fn();
}

describe('Menucontrollerpartner', () => {
  let menuController;
  let mockMenuService;

  beforeEach(() => {
    mockMenuService = new MockMenuService();
    menuController = new Menucontrollerpartner(mockMenuService);
  });

  describe('createMenu', () => {
    it('should create a new menu and return 201 status', async () => {
      const req = {
        restaurant: { id: 1 },
        body: { name: 'Spaghetti', price: 10000, spicyLevel: 2, restaurantId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      mockMenuService.createMenu.mockResolvedValue(req.body);

      await menuController.createMenu(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.MENU.CREATE.SUCCEED,
        data: req.body,
      });
    });

    it('should handle errors and return 400 status', async () => {
      const req = {
        body: {
          restaurant: { id: 1 },
          body: { name: 'Spaghetti', price: 10000, spicyLevel: 2, restaurantId: 2 },
        },
      };

      const res = {};

      const next = jest.fn();

      //mockMenuService.createMenu.mockRejectedValue(new Error('Database error'));

      await menuController.createMenu(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.MENU.CREATE.NOT_MY_RESTAURANTS),
      );

      // expect(res.status).toHaveBeenCalledWith(400);
      // expect(res.send).toHaveBeenCalledWith('메뉴 등록 중 오류가 발생했습니다.');
    });
  });

  describe('getRestaurantMenus', () => {
    it('should return menus for a restaurant and return 200 status', async () => {
      const req = {
        params: { restaurantId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      mockMenuService.restaurantIdMenu.mockResolvedValue([{ id: 1, name: 'Pizza' }]);

      await menuController.getRestaurantMenus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Pizza' }]);
    });

    it('should handle errors and return 400 status', async () => {
      const req = {
        params: { restaurantId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const next = jest.fn();

      mockMenuService.restaurantIdMenu.mockRejectedValue(new Error('Database error'));

      await menuController.getRestaurantMenus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('메뉴 목록 조회 중 오류가 발생했습니다.');
    });
  });

  describe('updateMenu', () => {
    it('should update a menu and return 200 status', async () => {
      const req = {
        params: { menuId: 1 },
        body: { name: 'Updated Pizza', price: 12000 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      mockMenuService.updateMenu.mockResolvedValue({ id: 1, name: 'Updated Pizza', price: 12000 });

      await menuController.updateMenu(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Pizza', price: 12000 });
    });

    it('should handle errors and return 400 status', async () => {
      const req = {
        params: { menuId: 1 },
        body: { name: 'Updated Pizza', price: 12000 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const next = jest.fn();

      mockMenuService.updateMenu.mockRejectedValue(new Error('Database error'));

      await menuController.updateMenu(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('메뉴 수정 중 오류가 발생했습니다.');
    });
  });

  describe('deleteMenu', () => {
    it('should delete a menu and return 200 status', async () => {
      const req = {
        params: { menuId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const next = jest.fn();

      mockMenuService.deleteMenu.mockResolvedValue();

      await menuController.deleteMenu(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('메뉴 1가 삭제되었습니다.');
    });

    it('should handle errors and return 400 status', async () => {
      const req = {
        params: { menuId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const next = jest.fn();

      mockMenuService.deleteMenu.mockRejectedValue(new Error('Database error'));

      await menuController.deleteMenu(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('메뉴 삭제 중 오류가 발생했습니다.');
    });
  });
});
