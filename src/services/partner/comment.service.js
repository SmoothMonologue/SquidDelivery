import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import commentRepository from '../../repositories/partner/comment.repository.js';

/**
 * CommentService
 * 비즈니스 로직을 처리하는 계층
 * 데이터 검증, 권한 확인, 에러 처리 등을 담당
 */
class CommentService {
  #commentRepository;

  constructor(commentRepository) {
    this.#commentRepository = commentRepository;
  }

  // 댓글 생성 서비스
  createComment = async ({ restaurantId, reviewId, content }) => {
    // 리뷰 존재 여부 확인
    const review = await this.#commentRepository.findReviewById(reviewId);
    if (!review) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 댓글 중복 작성 확인
    const existingComment = await this.#commentRepository.findCommentByReviewId(reviewId);
    if (existingComment) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.ALREADY_EXISTS);
      error.status = HTTP_STATUS.CONFLICT;
      throw error;
    }

    // 자신의 레스토랑 리뷰인지 확인
    if (review.restaurantId !== restaurantId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 댓글 생성
    const comment = await this.#commentRepository.createComment({
      restaurantId,
      reviewId,
      content
    });

    return {
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: comment
    };
  };

  // 전체 댓글 조회 서비스
  getAllComments = async () => {
    const comments = await this.#commentRepository.findAllComments();
    return {
      message: MESSAGES.COMMENTS.READ_LIST.SUCCEED,
      data: comments,
    };
  };

  // 댓글 수정 서비스
  updateComment = async ({ commentId, restaurantId, content }) => {
    // 댓글 존재 여부 및 권한 확인
    const comment = await this.#commentRepository.findCommentById(commentId);
    if (!comment) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 자신의 레스토랑 댓글인지 확인
    if (comment.restaurantId !== restaurantId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 댓글 수정
    const updatedComment = await this.#commentRepository.updateComment(commentId, {
      content
    });

    return {
      message: MESSAGES.COMMENTS.UPDATE.SUCCEED,
      data: updatedComment
    };
  };

  // 댓글 삭제 서비스
  deleteComment = async ({ commentId, restaurantId }) => {
    // 댓글 존재 여부 및 권한 확인
    const comment = await this.#commentRepository.findCommentById(commentId);
    if (!comment) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 자신의 레스토랑 댓글인지 확인
    if (comment.restaurantId !== restaurantId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 댓글 삭제
    await this.#commentRepository.deleteComment(commentId);

    return {
      message: MESSAGES.COMMENTS.DELETE.SUCCEED
    };
  };
}

const commentService = new CommentService(commentRepository);

export default commentService;
