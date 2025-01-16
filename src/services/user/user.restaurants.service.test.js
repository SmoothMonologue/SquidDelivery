import { jest } from '@jest/globals';
import { UserRestaurantService } from './user.restaurants.service.js';

describe('UserRestaurantService test', () => {
    let mockRepository;
    let userRestaurantService;

    const mockRestaurants = [
        {
            id: 1,
            name: '맛있는 식당',
            category: '한식',
            address: '서울시 강남구',
        },
        {
            id: 2,
            name: '멋진 식당',
            category: '일식',
            address: '서울시 서초구',
        }
    ];

    beforeEach(() => {
        mockRepository = {
            getAllRestaurants: jest.fn(),
            getRestaurantsByKeyword: jest.fn()
        };
        userRestaurantService = new UserRestaurantService(mockRepository);
    });

    describe('getAllRestaurants', () => {
        it('모든 레스토랑 조회 성공', async () => {
            mockRepository.getAllRestaurants.mockResolvedValue(mockRestaurants);

            const result = await userRestaurantService.getAllRestaurants();

            expect(mockRepository.getAllRestaurants).toHaveBeenCalled();
            expect(result).toEqual(mockRestaurants);
        });

        it('등록된 레스토랑이 없을 경우 에러 발생', async () => {
            mockRepository.getAllRestaurants.mockResolvedValue([]);

            await expect(async () => {
                await userRestaurantService.getAllRestaurants();
            }).rejects.toThrow('등록된 업장이 없습니다.');
        });

        it('레스토랑 데이터가 null일 경우 에러 발생', async () => {
            mockRepository.getAllRestaurants.mockResolvedValue(null);

            await expect(async () => {
                await userRestaurantService.getAllRestaurants();
            }).rejects.toThrow('등록된 업장이 없습니다.');
        });
    });

    describe('getRestaurantsByKeyword', () => {
        const mockSearchResults = [
            {
                id: 1,
                name: '맛있는 식당',
                category: '한식',
            }
        ];

        it('키워드로 레스토랑 검색 성공', async () => {
            mockRepository.getRestaurantsByKeyword.mockResolvedValue(mockSearchResults);

            const result = await userRestaurantService.getRestaurantsByKeyword('맛있는');

            expect(mockRepository.getRestaurantsByKeyword).toHaveBeenCalledWith('맛있는');
            expect(result).toEqual([
                {
                    restaurantId: 1,
                    restaurantName: '맛있는 식당'
                }
            ]);
        });

        it('빈 키워드로 검색 시 에러 메시지 반환', async () => {
            const result = await userRestaurantService.getRestaurantsByKeyword('');

            expect(result.message).toBe('키워드를 입력해주세요.');
        });

        it('공백 키워드로 검색 시 에러 메시지 반환', async () => {
            const result = await userRestaurantService.getRestaurantsByKeyword('   ');

            expect(result.message).toBe('키워드를 입력해주세요.');
        });

        it('검색 결과가 없을 경우 메시지 반환', async () => {
            mockRepository.getRestaurantsByKeyword.mockResolvedValue([]);

            const result = await userRestaurantService.getRestaurantsByKeyword('존재하지않는식당');

            expect(result.message).toBe('검색 결과가 없습니다.');
        });
    });
}); 