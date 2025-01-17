import { jest } from '@jest/globals'
import { ReviewService } from './review.service.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('ReviewService test', () => {
    let mockReviewRepository;
    let reviewService;

    // 테스트용 mock 데이터
    const mockOrder = {
        id: 1,
        userId: 1,
        restaurantId: 1,
    };

    const mockReview = {
        id: 1,
        userId: 1,
        orderId: 1,
        restaurantId: 1,
        image: 'image.jpg',
        content: '맛있어요!',
        starRating: 5,
    };

    beforeEach(() => {
        mockReviewRepository = {
            findOrderById: jest.fn(),
            findReviewByOrderId: jest.fn(),
            createReview: jest.fn(),
            calStarRateAvg: jest.fn(),
            setStarRateAvg: jest.fn(),
            findAllReviews: jest.fn(),
            findReviewById: jest.fn(),
            updateReview: jest.fn(),
            deleteReview: jest.fn(),
        };
        reviewService = new ReviewService(mockReviewRepository);
    });

    describe('createReview', () => {
        const reviewData = {
            userId: 1,
            orderId: 1,
            image: 'image.jpg',
            content: '맛있어요!',
            starRating: 5,
        };

        it('리뷰 생성 성공', async () => {
            // Mocking
            mockReviewRepository.findOrderById.mockResolvedValue(mockOrder);
            mockReviewRepository.findReviewByOrderId.mockResolvedValue(null);
            mockReviewRepository.createReview.mockResolvedValue(mockReview);
            mockReviewRepository.calStarRateAvg.mockResolvedValue({ _avg: { starRating: 4.5 } });
            mockReviewRepository.setStarRateAvg.mockResolvedValue({ id: 1, starRating: 4.5 });

            const result = await reviewService.createReview(reviewData);

            expect(result.message).toBe(MESSAGES.REVIEWS.CREATE.SUCCEED);
            expect(result.data).toEqual(mockReview);
        });

        it('존재하지 않는 주문에 대한 리뷰 생성 실패', async () => {
            mockReviewRepository.findOrderById.mockResolvedValue(null);

            await expect(async () => {
                await reviewService.createReview(reviewData);
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
        });

        it('이미 존재하는 리뷰 생성 실패', async () => {
            mockReviewRepository.findOrderById.mockResolvedValue(mockOrder);
            mockReviewRepository.findReviewByOrderId.mockResolvedValue(mockReview);

            await expect(async () => {
                await reviewService.createReview(reviewData);
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.ALREADY_EXISTS);
        });

        it('잘못된 별점으로 리뷰 생성 실패', async () => {
            mockReviewRepository.findOrderById.mockResolvedValue(mockOrder);
            mockReviewRepository.findReviewByOrderId.mockResolvedValue(null);

            await expect(async () => {
                await reviewService.createReview({ ...reviewData, starRating: 6 });
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.INVALID_STAR_RATING);
        });
    });

    describe('getAllReviews', () => {
        it('전체 리뷰 조회 성공', async () => {
            const mockReviews = [mockReview];
            mockReviewRepository.findAllReviews.mockResolvedValue(mockReviews);

            const result = await reviewService.getAllReviews();

            expect(result.message).toBe(MESSAGES.REVIEWS.READ_LIST.SUCCEED);
            expect(result.data).toEqual(mockReviews);
        });
    });

    describe('updateReview', () => {
        const updateData = {
            reviewId: 1,
            userId: 1,
            content: '정말 맛있어요!',
            starRating: 5,
            image: 'new-image.jpg',
        };

        it('리뷰 수정 성공', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(mockReview);
            mockReviewRepository.updateReview.mockResolvedValue({
                ...mockReview,
                ...updateData,
            });

            const result = await reviewService.updateReview(updateData);

            expect(result.message).toBe(MESSAGES.REVIEWS.UPDATE.SUCCEED);
            expect(result.data.content).toBe(updateData.content);
        });

        it('존재하지 않는 리뷰 수정 실패', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(null);

            await expect(async () => {
                await reviewService.updateReview(updateData);
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
        });

        it('권한 없는 사용자의 리뷰 수정 실패', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(mockReview);

            await expect(async () => {
                await reviewService.updateReview({ ...updateData, userId: 999 });
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED);
        });
    });

    describe('deleteReview', () => {
        const deleteData = {
            reviewId: 1,
            userId: 1,
        };

        it('리뷰 삭제 성공', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(mockReview);
            mockReviewRepository.deleteReview.mockResolvedValue(mockReview);

            const result = await reviewService.deleteReview(deleteData);

            expect(result.message).toBe(MESSAGES.REVIEWS.DELETE.SUCCEED);
        });

        it('존재하지 않는 리뷰 삭제 실패', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(null);

            await expect(async () => {
                await reviewService.deleteReview(deleteData);
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
        });

        it('권한 없는 사용자의 리뷰 삭제 실패', async () => {
            mockReviewRepository.findReviewById.mockResolvedValue(mockReview);

            await expect(async () => {
                await reviewService.deleteReview({ ...deleteData, userId: 999 });
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED);
        });
    });
});
