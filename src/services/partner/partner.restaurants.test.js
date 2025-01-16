import { jest } from '@jest/globals';
import { PartnerRestaurantService } from './partner.restaurants.service.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('PartnerRestaurantService', () => {
    let restaurantService;
    let mockRepository;

    const mockRestaurant = {
        id: 1,
        restaurantName: '테스트 레스토랑',
        partnerId: 1
    };

    beforeEach(() => {
        mockRepository = {
            createRestaurant: jest.fn(),
            findRestaurantById: jest.fn(),
            updateRestaurant: jest.fn(),
            deleteRestaurant: jest.fn(),
            findRestaurantsByPartnerId: jest.fn()
        };
        restaurantService = new PartnerRestaurantService(mockRepository);
    });

    describe('createRestaurant', () => {
        it('레스토랑 생성 성공', async () => {
            const restaurantData = { restaurantName: '테스트 레스토랑' };
            const partnerId = 1;
            mockRepository.createRestaurant.mockResolvedValue(mockRestaurant);

            const result = await restaurantService.createRestaurant(restaurantData, partnerId);

            expect(mockRepository.createRestaurant).toHaveBeenCalledWith(restaurantData, partnerId);
            expect(result).toEqual(mockRestaurant);
        });

        it('레스토랑 이름 없이 생성 실패', async () => {
            const restaurantData = {};
            const partnerId = 1;

            await expect(async () => {
                await restaurantService.createRestaurant(restaurantData, partnerId);
            }).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.REQUIRED_FIELDS);
        });
    });

    describe('updateRestaurant', () => {
        it('레스토랑 수정 성공', async () => {
            const updateData = { restaurantName: '수정된 레스토랑' };
            mockRepository.findRestaurantById.mockResolvedValue(mockRestaurant);
            mockRepository.updateRestaurant.mockResolvedValue({
                ...mockRestaurant,
                ...updateData
            });

            const result = await restaurantService.updateRestaurant(1, updateData);

            expect(mockRepository.updateRestaurant).toHaveBeenCalledWith(1, updateData);
            expect(result.restaurantName).toBe(updateData.restaurantName);
        });

        it('존재하지 않는 레스토랑 수정 실패', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(null);

            await expect(async () => {
                await restaurantService.updateRestaurant(999, {});
            }).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
        });
    });

    describe('deleteRestaurant', () => {
        it('레스토랑 삭제 성공', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(mockRestaurant);
            mockRepository.deleteRestaurant.mockResolvedValue(mockRestaurant);

            const result = await restaurantService.deleteRestaurant(1);

            expect(mockRepository.deleteRestaurant).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockRestaurant);
        });

        it('존재하지 않는 레스토랑 삭제 실패', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(null);

            await expect(async () => {
                await restaurantService.deleteRestaurant(999);
            }).rejects.toThrow('업장이 존재하지 않습니다.');
        });
    });

    describe('getRestaurantsByPartner', () => {
        it('파트너의 레스토랑 목록 조회 성공', async () => {
            const mockRestaurants = [mockRestaurant];
            mockRepository.findRestaurantsByPartnerId.mockResolvedValue(mockRestaurants);

            const result = await restaurantService.getRestaurantsByPartner(1);

            expect(mockRepository.findRestaurantsByPartnerId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockRestaurants);
        });
    });

    describe('verifyRestaurantOwnership', () => {
        it('레스토랑 소유권 확인 성공', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(mockRestaurant);

            await restaurantService.verifyRestaurantOwnership(1, 1);

            expect(mockRepository.findRestaurantById).toHaveBeenCalledWith(1);
        });

        it('존재하지 않는 레스토랑 확인 실패', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(null);

            await expect(async () => {
                await restaurantService.verifyRestaurantOwnership(999, 1);
            }).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
        });

        it('권한 없는 파트너의 레스토랑 확인 실패', async () => {
            mockRepository.findRestaurantById.mockResolvedValue(mockRestaurant);

            await expect(async () => {
                await restaurantService.verifyRestaurantOwnership(1, 999);
            }).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NO_PERMISSION);
        });
    });
});