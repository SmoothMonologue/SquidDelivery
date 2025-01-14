import { HTTP_STATUS } from '../../constants/http-status.constant.js';

/**
 * ReviewController
 * HTTP 요청/응답 처리를 담당하는 계층
 * 요청 데이터 추출, 응답 형식 결정, 에러 처리 미들웨어 연동
 */
class ReviewController {
    constructor(reviewService) {
      this.reviewService = reviewService;
    }
  
    // 리뷰 생성 컨트롤러
    createReview = async (req, res, next) => {
      try {
        const { orderId, image, content, starRating } = req.body;
        console.log(`req.body의 정보`,req.body);
        const userId = req.user.id;  // 인증 미들웨어에서 설정된 사용자 정보
        console.log(`userId의 정보`,userId);

        const result = await this.reviewService.createReview({
          userId,
          orderId,
          image,
          content,
          starRating
        });
  
        return res.status(HTTP_STATUS.CREATED).json(result);
      } catch (error) {
        next(error);  // 에러 처리 미들웨어로 전달
      }
    };

    // 전체 리뷰 조회 컨트롤러
    getAllReviews = async (req, res, next) => {
      try {
        const result = await this.reviewService.getAllReviews();
        return res.status(HTTP_STATUS.OK).json(result);
      } catch (error) {
        next(error);
      }
    };

    // 리뷰 수정 컨트롤러
    updateReview = async (req, res, next) => {
      try {
        const { reviewId } = req.params;
        const { content, starRating, image } = req.body;
        const userId = req.user.id;
  
        const result = await this.reviewService.updateReview({
          reviewId: Number(reviewId),
          userId,
          content,
          starRating,
          image
        });
  
        return res.status(HTTP_STATUS.OK).json(result);
      } catch (error) {
        next(error);
      }
    };

    // 리뷰 삭제 컨트롤러
    deleteReview = async (req, res, next) => {
      try {
        const { reviewId } = req.params;
        const userId = req.user.id;
  
        const result = await this.reviewService.deleteReview({
          reviewId: Number(reviewId),
          userId
        });
  
        return res.status(HTTP_STATUS.OK).json(result);
      } catch (error) {
        next(error);
      }
    };
}

export default ReviewController;
