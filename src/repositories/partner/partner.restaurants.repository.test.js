import { PartnerRestaurantRepository } from './partner.restaurants.repository.js';
import { jest } from '@jest/globals';
import { MESSAGES } from '../../constants/message.constant.js';

describe('PartnerRestaurantRepository', () => {
  let partnerRestaurantRepository;
  let mockPrisma;

  beforeEach(() => {
    mockPrisma = {
      restaurant: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      comment: {
        deleteMany: jest.fn(),
      },
      review: {
        deleteMany: jest.fn(),
      },
      cart: {
        deleteMany: jest.fn(),
      },
      menu: {
        deleteMany: jest.fn(),
      },
      $transaction: jest.fn(),
    };
    partnerRestaurantRepository = new PartnerRestaurantRepository(mockPrisma);
  });

  describe('createRestaurant', () => {
    it('레스토랑을 성공적으로 생성해야 합니다', async () => {
      const mockData = {
        restaurantName: '테스트 레스토랑',
        keyword: '테스트,맛집',
        starRating: 4.5,
        businessNumber: '123-45-67890',
        number: '02-1234-5678'
      };
      const partnerId = 1;

      const expectedRestaurant = {
        id: 1,
        partnerId,
        ...mockData
      };

      mockPrisma.restaurant.create.mockResolvedValue(expectedRestaurant);

      const result = await partnerRestaurantRepository.createRestaurant(mockData, partnerId);

      expect(mockPrisma.restaurant.create).toHaveBeenCalledWith({
        data: {
          partnerId,
          ...mockData
        }
      });
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('updateRestaurant', () => {
    it('레스토랑 정보를 성공적으로 업데이트해야 합니다', async () => {
      const restaurantId = 1;
      const updateData = {
        restaurantName: '업데이트된 레스토랑',
        keyword: '업데이트,맛집',
        starRating: 4.8,
        businessNumber: '123-45-67890',
        number: '02-1234-5678'
      };

      mockPrisma.restaurant.findUnique.mockResolvedValue({ id: restaurantId });
      mockPrisma.restaurant.update.mockResolvedValue({ id: restaurantId, ...updateData });

      const result = await partnerRestaurantRepository.updateRestaurant(restaurantId, updateData);

      expect(mockPrisma.restaurant.findUnique).toHaveBeenCalledWith({ where: { id: restaurantId } });
      expect(mockPrisma.restaurant.update).toHaveBeenCalledWith({
        where: { id: restaurantId },
        data: updateData
      });
      expect(result).toEqual({ id: restaurantId, ...updateData });
    });

    it('존재하지 않는 레스토랑을 업데이트하려 할 때 에러를 발생시켜야 합니다', async () => {
      const restaurantId = 999;
      mockPrisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(
        partnerRestaurantRepository.updateRestaurant(restaurantId, {})
      ).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    });
  });

  describe('deleteRestaurant', () => {
    it('레스토랑과 관련된 모든 데이터를 성공적으로 삭제해야 합니다', async () => {
      const restaurantId = 1;
      const mockDeleteResult = { id: restaurantId };

      mockPrisma.$transaction.mockImplementation(async (callback) => {
        return callback(mockPrisma);
      });
      mockPrisma.restaurant.delete.mockResolvedValue(mockDeleteResult);

      const result = await partnerRestaurantRepository.deleteRestaurant(restaurantId);

      expect(mockPrisma.comment.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.review.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.cart.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.menu.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.restaurant.delete).toHaveBeenCalledWith({ where: { id: restaurantId } });
      expect(result).toEqual(mockDeleteResult);
    });

    it('삭제 중 에러 발생 시 적절한 에러를 throw해야 합니다', async () => {
      const restaurantId = 1;
      mockPrisma.$transaction.mockRejectedValue(new Error('DB Error'));

      await expect(
        partnerRestaurantRepository.deleteRestaurant(restaurantId)
      ).rejects.toThrow(MESSAGES.RESTAURANTS.DELETE.ERROR);
    });
  });

  describe('findRestaurantsByPartnerId', () => {
    it('파트너 ID로 레스토랑을 찾아야 합니다', async () => {
      const partnerId = 1;
      const mockRestaurant = {
        id: 1,
        partnerId,
        restaurantName: '테스트 레스토랑'
      };

      mockPrisma.restaurant.findUnique.mockResolvedValue(mockRestaurant);

      const result = await partnerRestaurantRepository.findRestaurantsByPartnerId(partnerId);

      expect(mockPrisma.restaurant.findUnique).toHaveBeenCalledWith({ where: { partnerId } });
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('findRestaurantById', () => {
    it('ID로 레스토랑을 찾아야 합니다', async () => {
      const restaurantId = 1;
      const mockRestaurant = {
        id: restaurantId,
        partnerId: 1,
        restaurantName: '테스트 레스토랑',
        keyword: '테스트',
        starRating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        businessNumber: '123-45-67890',
        number: '02-1234-5678'
      };

      mockPrisma.restaurant.findUnique.mockResolvedValue(mockRestaurant);

      const result = await partnerRestaurantRepository.findRestaurantById(restaurantId);

      expect(mockPrisma.restaurant.findUnique).toHaveBeenCalledWith({
        where: { id: restaurantId },
        select: expect.any(Object)
      });
      expect(result).toEqual(mockRestaurant);
    });

    it('존재하지 않는 레스토랑을 찾으려 할 때 에러를 발생시켜야 합니다', async () => {
      const restaurantId = 999;
      mockPrisma.restaurant.findUnique.mockResolvedValue(null);

      await expect(
        partnerRestaurantRepository.findRestaurantById(restaurantId)
      ).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
    });
  });
}); 