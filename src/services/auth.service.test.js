import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';
import { AuthService } from './auth.service.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';


describe('AuthService', () => {
  let authService;
  let mockUserRepository;
  let mockPartnerRepository;
 
  beforeEach(() => {
    mockUserRepository = {
      createUser: jest.fn(),
      signInUser: jest.fn(),
    };
    mockPartnerRepository = {
      createPartner: jest.fn(),
      signInPartner: jest.fn(),
    };
    authService = new AuthService(mockUserRepository, mockPartnerRepository);
    bcrypt.hashSync = jest.fn();
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        interest: ['korean', 'japanese'],
        phoneNumber: '010-1234-5678',
      };
      const hashedPassword = 'hashedPassword123';
      bcrypt.hashSync.mockReturnValue(hashedPassword);

      await authService.createUser(userData);

      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        interest: userData.interest,
        phoneNumber: userData.phoneNumber,
      });
    });
  });

  describe('createPartner', () => {
    it('should create a partner with hashed password', async () => {
      const partnerData = {
        email: 'partner@example.com',
        password: 'password123',
        name: 'Test Partner',
        phoneNumber: '010-1234-5678',
      };
      const hashedPassword = 'hashedPassword123';
      bcrypt.hashSync.mockReturnValue(hashedPassword);

      await authService.createPartner(partnerData);

      expect(mockPartnerRepository.createPartner).toHaveBeenCalledWith({
        email: partnerData.email,
        password: hashedPassword,
        name: partnerData.name,
        phoneNumber: partnerData.phoneNumber,
      });
    });
  });

  describe('signInPartner', () => {
    it('should return access token when credentials are valid', async () => {
      const partnerData = {
        email: 'partner@example.com',
        password: 'password123',
      };
      const partner = {
        id: 1,
        password: 'hashedPassword123',
      };
      const accessToken = 'valid.access.token';

      mockPartnerRepository.signInPartner.mockResolvedValue(partner);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue(accessToken);

      // Act
      const result = await authService.signInPartner(partnerData);

      // Assert
      expect(result).toEqual({ data: { accessToken } });
    });

    it('should return unauthorized when partner not found', async () => {
      const partnerData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockPartnerRepository.signInPartner.mockResolvedValue(null);

      // Act
      const result = await authService.signInPartner(partnerData);

      // Assert
      expect(result).toEqual({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      });
    });
  });

  describe('signInUser', () => {
    it('should return access token when credentials are valid', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password123',
      };
      const user = {
        id: 1,
        password: 'hashedPassword123',
      };
      const accessToken = 'valid.access.token';

      mockUserRepository.signInUser.mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue(accessToken);

      const result = await authService.signInUser(userData);

      expect(result).toEqual({ data: { accessToken } });
    });

    it('should return unauthorized when password does not match', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'wrongpassword',
      };
      const user = {
        id: 1,
        password: 'hashedPassword123',
      };

      mockUserRepository.signInUser.mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(false);

      const result = await authService.signInUser(userData);

      expect(result).toEqual({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      });
    });
  });

  describe('signOut', () => {
    it('should return success message for valid token', async () => {
      const authorization = {
        authorization: 'Bearer valid.token.here',
      };

      jwt.verify.mockReturnValue({});

      const result = await authService.signOut(authorization);

      expect(result).toEqual({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
      });
    });

    it('should return unauthorized when no token provided', async () => {
      const authorization = {};

      const result = await authService.signOut(authorization);

      expect(result).toEqual({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
      });
    });

    it('should return unauthorized for invalid token format', async () => {
      const authorization = {
        authorization: 'InvalidToken',
      };

      const result = await authService.signOut(authorization);

      expect(result).toEqual({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.JWT.INVALID,
      });
    });
  });
});
