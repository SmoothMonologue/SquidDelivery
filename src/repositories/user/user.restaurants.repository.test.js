import { jest } from '@jest/globals';
import { UserRestaurantRepository } from './user.restaurants.repository.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('UserRestaurantRepository test', () => {
    let fakePrisma;
    let userRestaurantRepository;

    const mockRestaurant = {
        id: 1,
        restaurantName: '맛있는 식당',
        starRating: 4.5,
        keyword: '한식,분식',
        number: '02-123-4567',
        Menu: [
            { id: 1, name: '떡볶이', price: 5000 }
        ]
    };

    beforeEach(() => {
        fakePrisma = {
            restaurant: {
                findMany: jest.fn(),
                findUnique: jest.fn()
            }
        };
        userRestaurantRepository = new UserRestaurantRepository(fakePrisma);
    });

    describe('getAllRestaurants', () => {
        it('전체 식당 목록 조회 성공', async () => {
            const mockRestaurants = [mockRestaurant];
            fakePrisma.restaurant.findMany.mockResolvedValue(mockRestaurants);

            const result = await userRestaurantRepository.getAllRestaurants();

            expect(fakePrisma.restaurant.findMany).toHaveBeenCalledWith({
                select: {
                    id: true,
                    restaurantName: true,
                    starRating: true,
                    keyword: true,
                    createdAt: true,
                    number: true,
                    Menu: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    }
                }
            });
            expect(result).toEqual(mockRestaurants);
        });
    });

    describe('getAllRestaurantsById', () => {
        it('특정 식당 조회 성공', async () => {
            fakePrisma.restaurant.findUnique.mockResolvedValue(mockRestaurant);

            const result = await userRestaurantRepository.getAllRestaurantsById(1);

            expect(result).toEqual(mockRestaurant);
        });

        it('존재하지 않는 식당 조회 실패', async () => {
            fakePrisma.restaurant.findUnique.mockResolvedValue(null);

            await expect(async () => {
                await userRestaurantRepository.getAllRestaurantsById(999);
            }).rejects.toThrow(MESSAGES.RESTAURANTS.COMMON.NOT_FOUND);
        });
    });

    describe('getRestaurantsByKeyword', () => {
        it('키워드로 식당 검색 성공', async () => {
            const mockRestaurants = [mockRestaurant];
            fakePrisma.restaurant.findMany.mockResolvedValue(mockRestaurants);

            const result = await userRestaurantRepository.getRestaurantsByKeyword('한식');

            expect(fakePrisma.restaurant.findMany).toHaveBeenCalledWith({
                select: {
                    id: true,
                    restaurantName: true,
                    keyword: true,
                    starRating: true,
                    Menu: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    }
                },
                where: {
                    OR: [
                        { keyword: { contains: '한식' } },
                        { Menu: { some: { name: { contains: '한식' } } } }
                    ]
                },
                distinct: ['id']
            });
            expect(result).toEqual(mockRestaurants);
        });
    });
}); 