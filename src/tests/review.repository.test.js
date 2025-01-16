import { jest } from '@jest/globals'
import {ReviewRepository} from '../repositories/user/review.repository.js';

describe('ReviewRepository test', () => {
    let fakePrisma;
    let reviewRepository;
    
    // 테스트용 mock 데이터
    const mockOrder = {
        id: 1,
        userId: 1,
        restaurantId: 1,
        status: 'COMPLETED',
    };

    const mockReview = {
        id: 1,
        orderId: 1,
        userId: 1,
        restaurantId: 1,
        image: 'image.jpg',
        content: '맛있어요!',
        starRating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockComment = {
        id: 1,
        reviewId: 1,
        content: '감사합니다',
    };

    beforeEach(() => {
        // Prisma mock 객체 설정
        fakePrisma = {
            order: {
                findUnique: jest.fn(),
            },
            review: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
                aggregate: jest.fn(),
            },
            restaurant: {
                update: jest.fn(),
            },
        };
        reviewRepository = new ReviewRepository(fakePrisma);
    });

    describe('findOrderById', () => {
        it('주문 정보 조회 성공', async () => {
            fakePrisma.order.findUnique.mockResolvedValue(mockOrder);
            
            const result = await reviewRepository.findOrderById(1);
            
            expect(fakePrisma.order.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockOrder);
        });

        it('존재하지 않는 주문 조회', async () => {
            fakePrisma.order.findUnique.mockResolvedValue(null);
            
            const result = await reviewRepository.findOrderById(999);
            
            expect(result).toBeNull();
        });
    });

    describe('findReviewByOrderId', () => {
        it('주문에 대한 리뷰 조회 성공', async () => {
            fakePrisma.review.findUnique.mockResolvedValue(mockReview);
            
            const result = await reviewRepository.findReviewByOrderId(1);
            
            expect(fakePrisma.review.findUnique).toHaveBeenCalledWith({
                where: { orderId: 1 },
            });
            expect(result).toEqual(mockReview);
        });
    });

    describe('createReview', () => {
        it('리뷰 생성 성공', async () => {
            const reviewData = {
                orderId: 1,
                userId: 1,
                content: '맛있어요!',
                starRating: 5,
            };
            
            fakePrisma.review.create.mockResolvedValue({ ...mockReview, ...reviewData });
            
            const result = await reviewRepository.createReview(reviewData);
            
            expect(fakePrisma.review.create).toHaveBeenCalledWith({
                data: reviewData,
            });
            expect(result.content).toBe(reviewData.content);
        });
    });

    describe('calStarRateAvg', () => {
        it('평점 평균 계산 성공', async () => {
            const avgRating = { _avg: { starRating: 4.5 } };
            fakePrisma.review.aggregate.mockResolvedValue(avgRating);
            
            const result = await reviewRepository.calStarRateAvg(1);
            
            expect(fakePrisma.review.aggregate).toHaveBeenCalledWith({
                _avg: { starRating: true },
                where: { restaurantId: 1 },
            });
            expect(result).toEqual(avgRating);
        });
    });

    describe('setStarRateAvg', () => {
        it('식당 평점 업데이트 성공', async () => {
            const updatedRestaurant = { id: 1, starRating: 4.5 };
            fakePrisma.restaurant.update.mockResolvedValue(updatedRestaurant);
            
            const result = await reviewRepository.setStarRateAvg(1, 4.5);
            
            expect(fakePrisma.restaurant.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { starRating: 4.5 },
            });
            expect(result).toEqual(updatedRestaurant);
        });
    });

    describe('findAllReviews', () => {
        it('모든 리뷰 조회 성공', async () => {
            const mockReviews = [{ ...mockReview, Comment: [mockComment] }];
            fakePrisma.review.findMany.mockResolvedValue(mockReviews);
            
            const result = await reviewRepository.findAllReviews();
            
            expect(fakePrisma.review.findMany).toHaveBeenCalledWith({
                include: { Comment: true },
                orderBy: { createdAt: 'desc' },
            });
            expect(result).toEqual(mockReviews);
        });
    });

    describe('findReviewByRestaurantId', () => {
        it('식당별 리뷰 조회 성공', async () => {
            const mockReviews = [mockReview];
            fakePrisma.review.findMany.mockResolvedValue(mockReviews);
            
            const result = await reviewRepository.findReviewByRestaurantId('1');
            
            expect(fakePrisma.review.findMany).toHaveBeenCalledWith({
                where: { restaurantId: 1 },
            });
            expect(result).toEqual(mockReviews);
        });
    });

    describe('findReviewById', () => {
        it('특정 리뷰 조회 성공', async () => {
            fakePrisma.review.findUnique.mockResolvedValue(mockReview);
            
            const result = await reviewRepository.findReviewById(1);
            
            expect(fakePrisma.review.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockReview);
        });
    });

    describe('updateReview', () => {
        it('리뷰 수정 성공', async () => {
            const updateData = { content: '정말 맛있어요!' };
            const updatedReview = { ...mockReview, ...updateData };
            fakePrisma.review.update.mockResolvedValue(updatedReview);
            
            const result = await reviewRepository.updateReview(1, updateData);
            
            expect(fakePrisma.review.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updateData,
            });
            expect(result.content).toBe(updateData.content);
        });
    });

    describe('deleteReview', () => {
        it('리뷰 삭제 성공', async () => {
            fakePrisma.review.delete.mockResolvedValue(mockReview);
            
            const result = await reviewRepository.deleteReview(1);
            
            expect(fakePrisma.review.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(result).toEqual(mockReview);
        });
    });
});  
