/**
 * CommentRepository
 * 데이터베이스와의 직접적인 상호작용을 담당하는 계층
 * Prisma를 통한 데이터 CRUD 작업 수행
 */
export class CommentRepository {
  #prisma;
  constructor(prisma) {
    this.#prisma = prisma;
  }

  // 리뷰 존재 여부 확인 및 상세 정보 조회
  findReviewById = async (reviewId) => {
    return this.#prisma.review.findUnique({
      where: { id: Number(reviewId) },
      include: {
        Comment: true, // 기존 댓글 정보 포함
        Restaurant: {
          // 레스토랑 정보 포함
          select: {
            id: true,
            partnerId: true,
            restaurantName: true,
          },
        },
      },
    });
  };

  // 리뷰에 대한 댓글 존재 여부 확인
  findCommentByReviewId = async (commentId) => {
    return this.#prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });
  };

  // 새로운 댓글 생성
  createComment = async ({ reviewId, comment, partnerId }) => {
    const newComment = await this.#prisma.comment.create({
      data: {
        partnerId,
        reviewId,
        comment,
      },
      // include: {
      //   restaurantId: true,
      //   reviewId: true,
      // },
    });

    return newComment;
  };

  // 모든 댓글 조회 (리뷰 포함, 최신순 정렬)
  findAllComments = async () => {
    return this.#prisma.comment.findMany({
      include: {
        Review: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };

  // 댓글 수정
  updateComment = async (commentId, comment) => {
    return this.#prisma.comment.update({
      where: { id: Number(commentId) },
      data: { comment },
    });
  };

  // 댓글 삭제
  deleteComment = async (commentId) => {
    return this.#prisma.comment.delete({
      where: { id: Number(commentId) },
    });
  };
}
