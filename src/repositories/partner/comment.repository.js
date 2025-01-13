import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * CommentRepository
 * 데이터베이스와의 직접적인 상호작용을 담당하는 계층
 * Prisma를 통한 데이터 CRUD 작업 수행
 */
class CommentRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // 리뷰 존재 여부 확인 및 상세 정보 조회
  findReviewById = async (reviewId) => {
    return this.prisma.review.findUnique({
      where: { id: Number(reviewId) },
      include: {
        Comment: true,  // 기존 댓글 정보 포함
        Restaurant: {   // 레스토랑 정보 포함
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  };

  // 리뷰에 대한 댓글 존재 여부 확인
  findCommentByReviewId = async (reviewId) => {
    return this.prisma.comment.findUnique({
      where: { reviewId: Number(reviewId) }
    });
  };

  // 새로운 댓글 생성
  createComment = async (commentData) => {
    return this.prisma.comment.create({
      data: commentData,
      include: {
        Review: true  // 연관된 리뷰 정보 포함
      }
    });
  };

  // 댓글 수정
  updateComment = async (commentId, updateData) => {
    return this.prisma.comment.update({
      where: { id: Number(commentId) },
      data: updateData,
      include: {
        Review: true  // 연관된 리뷰 정보 포함
      }
    });
  };

  // 댓글 삭제
  deleteComment = async (commentId) => {
    return this.prisma.comment.delete({
      where: { id: Number(commentId) }
    });
  };
}

export default new CommentRepository(prisma);
