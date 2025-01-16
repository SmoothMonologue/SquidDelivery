
/**
 * ReviewRepository
 * 데이터베이스와의 직접적인 상호작용을 담당하는 계층
 * Prisma를 통한 데이터 CRUD 작업 수행
 */
export class ReviewRepository {
  #prisma;

  constructor(prismaClient) {
    this.#prisma = prismaClient;
  }

  // 주문 정보 조회 (장바구니 정보 포함)
  findOrderById = async (orderId) => {
    return this.#prisma.order.findUnique({
      where: { id: orderId },
    });
  };

  // 주문에 대한 리뷰 존재 여부 확인
  findReviewByOrderId = async (orderId) => {
    return this.#prisma.review.findUnique({
      where: { orderId },
    });
  };

  // 새로운 리뷰 생성
  createReview = async (reviewData) => {
    return this.#prisma.review.create({
      data: reviewData,
    });
  };

  //평점 계산
  calStarRateAvg = async (restaurantId) => {
    return this.#prisma.review.aggregate({
      _avg: {
        starRating: true,
      },
      where: {
        restaurantId,
      },
    });
  };

  //리뷰 등록 시 평점 반영
  setStarRateAvg = async (restaurantId, starRating) => {
    return this.#prisma.restaurant.update({
      where: {
        id: restaurantId,
      },
      data: {
        starRating,
      },
    });
  };

  // 모든 리뷰 조회 (댓글 포함, 최신순 정렬)
  findAllReviews = async () => {
    return this.#prisma.review.findMany({
      include: {
        Comment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };

  // 특정 식당에 해당하는 리뷰들 조회
  findReviewByRestaurantId = async (restaurantId) => {
    return this.#prisma.review.findMany({
      where: { restaurantId: Number(restaurantId) },
    });
  };

  // 특정 리뷰 조회
  findReviewById = async (reviewId) => {
    return this.#prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });
  };

  // 리뷰 수정
  updateReview = async (reviewId, updateData) => {
    return this.#prisma.review.update({
      where: { id: Number(reviewId) },
      data: updateData,
    });
  };

  // 리뷰 삭제
  deleteReview = async (reviewId) => {
    return this.#prisma.review.delete({
      where: { id: Number(reviewId) },
    });
  };
}


