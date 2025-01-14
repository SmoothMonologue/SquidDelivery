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
            restaurantName: true,
            restaurantId: true
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
  createComment = async ({ restaurantId, reviewId, comment }) => {
    console.log('Repository received:', { restaurantId, reviewId, comment });
    
    // restaurant 찾기 전에 로그 추가
    console.log('Looking for restaurant with ID:', restaurantId);
    
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: Number(restaurantId) },
      select: { partnerId: true }
    });

    // restaurant 찾은 후 결과 확인
    console.log('Found restaurant:', restaurant);

    if (!restaurant) {
      throw new Error(`Restaurant with ID ${restaurantId} not found`);
    }

    return this.prisma.comment.create({
      data: {
        partnerId: restaurant.partnerId,
        reviewId: Number(reviewId),
        comment,
      },
      include: {
        Review: true
      }
    });
  };

  // 모든 댓글 조회 (리뷰 포함, 최신순 정렬)
  findAllComments = async () => {
    return this.prisma.comment.findMany({
      include: {
        Review: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
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

  // 댓글 ID로 댓글 찾기 메소드 추가
  findCommentById = async (commentId) => {
    return this.prisma.comment.findUnique({
      where: { id: Number(commentId) },
      include: {
        Review: true,
        Partner: true
      }
    });
  };
}

// 클래스를 export 테스트 용
export { CommentRepository };
// 인스턴스도 export
export default new CommentRepository(prisma);
