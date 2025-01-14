import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * ReviewRepository
 * 데이터베이스와의 직접적인 상호작용을 담당하는 계층
 * Prisma를 통한 데이터 CRUD 작업 수행
 */
class ReviewRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // 주문 정보 조회 (장바구니 정보 포함)
  findOrderById = async (orderId) => {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { Cart: true },
    });
  };

  // 주문에 대한 리뷰 존재 여부 확인
  findReviewByOrderId = async (orderId) => {
    return this.prisma.review.findUnique({
      where: {
        orderId,
        restaurantId: restaurant.id,
      },
    });
  };

  // 새로운 리뷰 생성
  createReview = async (reviewData) => {
    return this.prisma.review.create({
      data: reviewData,
    });
  };

  // 모든 리뷰 조회 (댓글 포함, 최신순 정렬)
  findAllReviews = async () => {
    return this.prisma.review.findMany({
      include: {
        Comment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };

  // 특정 리뷰 조회
  findReviewById = async (reviewId) => {
    return this.prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });
  };

  // 리뷰 수정
  updateReview = async (reviewId, updateData) => {
    return this.prisma.review.update({
      where: { id: Number(reviewId) },
      data: updateData,
    });
  };

  // 리뷰 삭제
  deleteReview = async (reviewId) => {
    return this.prisma.review.delete({
      where: { id: Number(reviewId) },
    });
  };
}

export default new ReviewRepository(prisma);
