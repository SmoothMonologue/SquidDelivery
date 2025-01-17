import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

/**
 * CommentService
 * 비즈니스 로직을 처리하는 계층
 * 데이터 검증, 권한 확인, 에러 처리 등을 담당
 */
export class CommentService {
  #commentRepository;

  constructor(commentRepository) {
    this.#commentRepository = commentRepository;
  }

  // 댓글 생성 서비스
  createComment = async ({ restaurantId, reviewId, comment, partnerId }) => {
    // 먼저 검증 로직 수행
    const review = await this.#commentRepository.findReviewById(reviewId);
    if (!review) {
      const error = new Error(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 자신의 레스토랑 리뷰인지 확인
    if (review.restaurantId !== restaurantId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 이미 댓글이 있는지 확인
    const existingComment = await this.#commentRepository.findCommentByReviewId(reviewId);
    if (existingComment) {
      const error = new Error(MESSAGES.COMMENTS.CREATE.ALREADY_EXISTS);
      error.status = HTTP_STATUS.CONFLICT;
      throw error;
    }

    // 댓글 생성
    const newComment = await this.#commentRepository.createComment({
      reviewId,
      comment,
      partnerId,
    });

    return {
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: newComment,
    };
  };

  // 전체 댓글 조회 서비스
  getAllComments = async (restaurantId) => {
    const comments = await this.#commentRepository.findAllComments(restaurantId);
    return {
      message: MESSAGES.COMMENTS.READ_LIST.SUCCEED,
      data: comments,
    };
  };

  // 댓글 수정 서비스
  updateComment = async ({ commentId, partnerId, comment }) => {
    // 댓글 존재 여부 및 권한 확인
    const newComment = await this.#commentRepository.findCommentByReviewId(commentId);
    if (!newComment) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 자신의 레스토랑 댓글인지 확인
    if (newComment.partnerId !== partnerId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 댓글 수정
    const updatedComment = await this.#commentRepository.updateComment(commentId, comment);

    return {
      message: MESSAGES.COMMENTS.UPDATE.SUCCEED,
      data: updatedComment,
    };
  };

  // 댓글 삭제 서비스
  deleteComment = async ({ commentId, partnerId }) => {
    // 댓글 존재 여부 및 권한 확인
    const comment = await this.#commentRepository.findCommentByReviewId(commentId);
    console.log(`------------>`, comment);
    if (!comment) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // 자신의 레스토랑 댓글인지 확인
    if (comment.partnerId !== partnerId) {
      const error = new Error(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
      error.status = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // 댓글 삭제
    await this.#commentRepository.deleteComment(commentId);

    return {
      message: MESSAGES.COMMENTS.DELETE.SUCCEED,
    };
  };
}
