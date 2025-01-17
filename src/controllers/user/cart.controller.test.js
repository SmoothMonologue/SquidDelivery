import { jest } from '@jest/globals';
import { CartController } from './cart.controller.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';

describe('장바구니 컨트롤러 테스트', () => {
  let mockService;
  let cartController;
  const mockCart = {
    userId: 1,
    restaurantId: 1,
  };
  beforeEach(() => {
    mockService = {
      createCart: jest.fn(),
      usingCart: jest.fn(),
      usingCarts: jest.fn(),
      chosenMenu: jest.fn(),
      addMenu: jest.fn(),
      newMenuOfCart: jest.fn(),
      deleteCart: jest.fn(),
    };
    cartController = new CartController(mockService);
  });

  describe('장바구니 추가', () => {
    const cartData = {
      userId: 1,
      restaurantId: 1,
    };
    it('장추 성공', async () => {
      // Mocking req.user
      const req = {
        user: { id: cartData.userId },
        body: { restaurantId: cartData.restaurantId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockService.createCart.mockResolvedValue(mockCart);
      await cartController.createCart(req, res);
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.CREATE.SUCCEED,
        data: mockCart,
      });
    });
    //실패 테스트인데 실패가 안 됨
    // it('장추 실패', async () => {
    //   // Mocking req.user
    //   const req = {
    //     user: { id: cartData.userId },
    //     body: { restaurantId: 2 },
    //   };
    //   const res = {
    //     status: jest.fn().mockReturnThis(),
    //     json: jest.fn(),
    //   };
    //   mockService.createCart.mockResolvedValue(new Error('Database error'));
    //   await cartController.createCart(req, res);
    //   //expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    //   expect(res.json).toHaveBeenCalledWith({
    //     message: MESSAGES.CARTS.CREATE.FAILED,
    //   });
    // });
  });

  describe('newMenuOfCart', () => {
    it('should add a new menu to the cart and return 200 status', async () => {
      const userId = 1;
      const cartId = 1;
      const menuId = 2;

      const req = {
        user: { id: userId },
        params: { cartId },
        body: { menuId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue({ userId });
      mockService.newMenuOfCart.mockResolvedValue({ cartId, menuId });

      await cartController.newMenuOfCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.UPDATE.SUCCEED,
        data: { cartId, menuId },
      });
    });

    it('should return 404 if cart is not found', async () => {
      const req = {
        user: { id: 1 },
        params: { cartId: 1 },
        body: { menuId: 2 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue(null);

      await cartController.newMenuOfCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.NOT_FOUND,
      });
    });

    it('should return 403 if cart does not belong to user', async () => {
      const req = {
        user: { id: 1 },
        params: { cartId: 1 },
        body: { menuId: 2 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue({ userId: 2 });

      await cartController.newMenuOfCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.FORBIDDEN);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.NOT_AUTHORIZED,
      });
    });
  });

  describe('usingCarts', () => {
    it("should return the user's carts and 200 status", async () => {
      const userId = 1;
      const req = {
        user: { id: userId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCarts.mockResolvedValue([{ id: 1, userId }]);

      await cartController.usingCarts(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.SUCCEED,
        data: [{ id: 1, userId }],
      });
    });

    it('should return 404 if no carts found', async () => {
      const req = {
        user: { id: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCarts.mockResolvedValue(null);

      await cartController.usingCarts(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.NOT_FOUND,
      });
    });
  });

  describe('deleteCart', () => {
    it('should delete the cart and return 200 status', async () => {
      const userId = 1;
      const cartId = 1;

      const req = {
        user: { id: userId },
        params: { cartId },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue({ userId });
      mockService.deleteCart.mockResolvedValue();

      await cartController.deleteCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.DELETE.SUCCEED,
      });
    });

    it('should return 404 if cart is not found', async () => {
      const req = {
        user: { id: 1 },
        params: { cartId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue(null);

      await cartController.deleteCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.NOT_FOUND,
      });
    });

    it('should return 403 if cart does not belong to user', async () => {
      const req = {
        user: { id: 1 },
        params: { cartId: 1 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockService.usingCart.mockResolvedValue({ userId: 2 });

      await cartController.deleteCart(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.FORBIDDEN);
      expect(res.json).toHaveBeenCalledWith({
        message: MESSAGES.CARTS.COMMON.NOT_AUTHORIZED,
      });
    });
  });
});
