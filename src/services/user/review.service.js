import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

/**
 * ReviewService
 * 비즈니스 로직을 처리하는 계층
 * 데이터 검증, 권한 확인, 에러 처리 등을 담당
 */
export class ReviewService {
  #reviewRepository;

  constructor(reviewRepository) {
    this.#reviewRepository = reviewRepository;
  }

  // 리뷰 생성 서비스
  createReview = async ({ userId, orderId, image, content, starRating }) => {
    // 주문 존재 여부 확인
    const order = await this.#reviewRepository.findOrderById(orderId);
    if (!order) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }
    
    const restaurantId = order.restaurantId;

    // 리뷰 중복 작성 확인
    const existingReview = await this.#reviewRepository.findReviewByOrderId(orderId);
    if (existingReview) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.ALREADY_EXISTS);
      error.status = HTTP_STATUS.CONFLICT;
      throw error;
    }

    // 리뷰 별점 최소 1점 최대 5점
    if (starRating < 1 || starRating > 5) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.INVALID_STAR_RATING);
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // 리뷰 생성
    const review = await this.#reviewRepository.createReview({
      userId,
      orderId,
      restaurantId,
      image,
      content,
      starRating,
    });

    // 리뷰 별점 평점 계산
    const newStarRating = await this.#reviewRepository.calStarRateAvg(restaurantId);
    await this.#reviewRepository.setStarRateAvg(restaurantId, newStarRating._avg.starRating);

    return {
      message: MESSAGES.REVIEWS.CREATE.SUCCEED,
      data: review,
    };
  };

  // 전체 리뷰 조회 서비스
  getAllReviews = async () => {
    const reviews = await this.#reviewRepository.findAllReviews();
    return {
      message: MESSAGES.REVIEWS.READ_LIST.SUCCEED,
      data: reviews,
    };
  };

  // 리뷰 수정 서비스
  updateReview = async ({ reviewId, userId, content, starRating, image }) => {
    // 리뷰 존재 여부 확인
    const review = await this.#reviewRepository.findReviewById(reviewId);
    if (!review) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 리뷰 작성자 확인
    if (review.userId !== userId) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    const updatedReview = await this.#reviewRepository.updateReview(reviewId, {
      content,
      starRating,
      image,
    });

    return {
      message: MESSAGES.REVIEWS.UPDATE.SUCCEED,
      data: updatedReview,
    };
  };

  // 리뷰 삭제 서비스
  deleteReview = async ({ reviewId, userId }) => {
    // 리뷰 존재 여부 확인
    const review = await this.#reviewRepository.findReviewById(reviewId);
    if (!review) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 리뷰 작성자 확인
    if (review.userId !== userId) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    await this.#reviewRepository.deleteReview(reviewId);

    return {
      message: MESSAGES.REVIEWS.DELETE.SUCCEED,
    };
  };
}

// export default new ReviewService();
