import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import commentService from '../../services/partner/comment.service.js';
/**
 * CommentController
 * HTTP 요청/응답 처리를 담당하는 계층
 * 요청 데이터 추출, 응답 형식 결정, 에러 처리 미들웨어 연동
 */
class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  // 댓글 생성 컨트롤러
  createComment = async (req, res, next) => {
    try {
      const { reviewId, content } = req.body;
      console.log('req.partner:', req.partner);  // 파트너 정보 확인
      console.log('req.restaurant:', req.restaurant);  // 레스토랑 정보 확인
      
      // req.restaurant이 undefined인 것 같습니다
      const restaurantId = req.restaurant?.id;  

      const result = await this.commentService.createComment({
        restaurantId,
        reviewId,
        content,
      });

      return res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  // 전체 댓글 조회 컨트롤러
  getAllComments = async (req, res, next) => {
    try {
      const result = await this.commentService.getAllComments();
      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  // 댓글 수정 컨트롤러
  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const restaurantId = req.restaurant.id;

      const result = await this.commentService.updateComment({
        commentId: Number(commentId),
        restaurantId,
        content,
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
      const restaurantId = req.restaurant.id;

      const result = await this.commentService.deleteComment({
        commentId: Number(commentId),
        restaurantId,
      });

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
