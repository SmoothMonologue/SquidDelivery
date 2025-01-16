import { PartnerRepository } from './partner.repository.js';
import { jest } from '@jest/globals';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('PartnerRepository', () => {
  let partnerRepository;
  let mockOrm;

  beforeEach(() => {
    // Mock Prisma ORM 설정
    mockOrm = {
      partner: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };
    partnerRepository = new PartnerRepository(mockOrm);
  });

  describe('createPartner', () => {
    const mockPartnerData = {
      name: '테스트 파트너',
      email: 'test@example.com',
      password: 'password123',
      phoneNumber: '010-1234-5678',
    };

    test('파트너 생성 성공 시, 생성된 파트너 정보를 반환해야 함', async () => {
      // Arrange
      mockOrm.partner.findUnique.mockResolvedValue(null);
      mockOrm.partner.create.mockResolvedValue(mockPartnerData);

      // Act
      const result = await partnerRepository.createPartner(mockPartnerData);

      // Assert
      expect(mockOrm.partner.findUnique).toHaveBeenCalledWith({
        where: { email: mockPartnerData.email },
      });
      expect(mockOrm.partner.create).toHaveBeenCalledWith({
        data: mockPartnerData,
      });
      expect(result).toEqual(mockPartnerData);
    });

    test('이미 존재하는 이메일로 가입 시도 시, 충돌 에러를 반환해야 함', async () => {
      // Arrange
      mockOrm.partner.findUnique.mockResolvedValue(mockPartnerData);

      // Act
      const result = await partnerRepository.createPartner(mockPartnerData);

      // Assert
      expect(result).toEqual({
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      });
      expect(mockOrm.partner.create).not.toHaveBeenCalled();
    });
  });

  describe('signInPartner', () => {
    const mockPartner = {
      id: 1,
      email: 'test@example.com',
      name: '테스트 파트너',
      password: 'hashedPassword',
      phoneNumber: '010-1234-5678',
    };

    test('존재하는 이메일로 로그인 시, 파트너 정보를 반환해야 함', async () => {
      // Arrange
      mockOrm.partner.findUnique.mockResolvedValue(mockPartner);

      // Act
      const result = await partnerRepository.signInPartner({
        email: mockPartner.email,
      });

      // Assert
      expect(mockOrm.partner.findUnique).toHaveBeenCalledWith({
        where: { email: mockPartner.email },
      });
      expect(result).toEqual(mockPartner);
    });

    test('존재하지 않는 이메일로 로그인 시, NOT_FOUND 에러를 반환해야 함', async () => {
      // Arrange
      mockOrm.partner.findUnique.mockResolvedValue(null);

      // Act
      const result = await partnerRepository.signInPartner({
        email: 'nonexistent@example.com',
      });

      // Assert
      expect(result).toEqual({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      });
    });
  });
}); 