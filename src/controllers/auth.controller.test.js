import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AuthController } from './auth.controller.js';
import { jest } from '@jest/globals';

class MockAuthService {
  createUser = jest.fn();
  createPartner = jest.fn();
  signInUser = jest.fn();
  signInPartner = jest.fn();
  signOut = jest.fn();
}

describe('AuthController', () => {
  let authController;
  let mockAuthService;

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    authController = new AuthController(mockAuthService);
  });

  describe('userSignUp', () => {
    it('should create a user and return 201 status', async () => {
      const req = {
        body: {
          email: 'user@example.com',
          password: 'password123',
          name: 'John Doe',
          interest: 'Food',
          phoneNumber: '1234567890',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.userSignUp(req, res);

      expect(mockAuthService.createUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith(MESSAGES.AUTH.SIGN_UP.SUCCEED);
    });
  });

  describe('partnerSignUp', () => {
    it('should create a partner and return 201 status', async () => {
      const req = {
        body: {
          email: 'partner@example.com',
          password: 'password123',
          name: 'Jane Doe',
          phoneNumber: '0987654321',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.partnerSignUp(req, res);

      expect(mockAuthService.createPartner).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith(MESSAGES.AUTH.SIGN_UP.SUCCEED);
    });
  });

  describe('signIn', () => {
    it('should sign in a user and return 200 status', async () => {
      const req = {
        body: {
          email: 'user@example.com',
          password: 'password123',
          catchBox: false,
        },
      };
      const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { data: { accessToken: 'user_access_token' } };
      mockAuthService.signInUser.mockResolvedValue(mockUser);

      await authController.signIn(req, res);

      expect(mockAuthService.signInUser).toHaveBeenCalledWith({
        email: req.body.email,
        password: req.body.password,
      });
      expect(res.setHeader).toHaveBeenCalledWith(
        'authorization',
        `Bearer ${mockUser.data.accessToken}`,
      );
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockUser.data);
    });

    it('should sign in a partner and return 200 status', async () => {
      const req = {
        body: {
          email: 'partner@example.com',
          password: 'password123',
          catchBox: true,
        },
      };
      const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockPartner = { data: { accessToken: 'partner_access_token' } };
      mockAuthService.signInPartner.mockResolvedValue(mockPartner);

      await authController.signIn(req, res);

      expect(mockAuthService.signInPartner).toHaveBeenCalledWith({
        email: req.body.email,
        password: req.body.password,
      });
      expect(res.setHeader).toHaveBeenCalledWith(
        'Authorization',
        `Bearer ${mockPartner.data.accessToken}`,
      );
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(mockPartner.data);
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {
        body: {
          email: 'user@example.com',
          password: 'password123',
          catchBox: false,
        },
      };
      const next = jest.fn();
      mockAuthService.signInUser.mockRejectedValue(new Error('Login error'));

      await authController.signIn(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('signOut', () => {
    it('should sign out a user and return the appropriate status', async () => {
      const req = {
        headers: {
          authorization: 'Bearer some_token',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSignOutResponse = { status: HTTP_STATUS.OK, message: 'Logout successful' };
      mockAuthService.signOut.mockResolvedValue(mockSignOutResponse);

      await authController.signOut(req, res);

      expect(mockAuthService.signOut).toHaveBeenCalledWith({
        authorization: req.headers.authorization,
      });
      expect(res.status).toHaveBeenCalledWith(mockSignOutResponse.status);
      expect(res.json).toHaveBeenCalledWith(mockSignOutResponse.message);
    });
  });
});
