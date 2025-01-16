import { HTTP_STATUS } from '../../constants/http-status.constant.js';
// import commentService from '../../services/partner/comment.service.js';
/**
 * CommentController
 * HTTP 요청/응답 처리를 담당하는 계층
 * 요청 데이터 추출, 응답 형식 결정, 에러 처리 미들웨어 연동
 */
export class CommentController {
  #commentService;
  constructor(commentService) {
    this.#commentService = commentService;
  }

  // 댓글 생성 컨트롤러
  createComment = async (req, res, next) => {
    try {
      const { reviewId, comment } = req.body;
      const restaurantId = req.restaurant.id;// 레스토랑 미들웨어에서 설정된 레스토랑 정보
      const partnerId = req.partner.id; 

      const result = await this.#commentService.createComment({
        restaurantId,
        partnerId,
        reviewId,
        comment,
      });

      return res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      next(error); // 에러 처리 미들웨어로 전달
    }
  };

  // 전체 댓글 조회 컨트롤러
  getAllComments = async (req, res, next) => {
    try {
      const result = await this.#commentService.getAllComments();
      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 수정 컨트롤러
  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
      const partnerId = req.partner.id;

      const result = await this.#commentService.updateComment({
        commentId: Number(commentId),
        partnerId,
        comment,
      });

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 삭제 컨트롤러
  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const partnerId = req.partner.id;

      const result = await this.#commentService.deleteComment({
        commentId: Number(commentId),
        partnerId,
      });

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}

// export default new CommentController(commentService);
