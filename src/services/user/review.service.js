class ReviewService {
  #reviewRepository;
  
  constructor(reviewRepository) {
    this.#reviewRepository = reviewRepository;
  }

  createReview = async ({ userId, orderId, image, content, starRating }) => {
    const order = await this.#reviewRepository.findOrderById(orderId);
    if (!order) {
      throw new Error('주문을 찾을 수 없습니다.');
    }

    const existingReview = await this.#reviewRepository.findReviewByOrderId(orderId);
    if (existingReview) {
      throw new Error('이미 리뷰가 존재합니다.');
    }

    return this.#reviewRepository.createReview({
      userId,
      orderId,
      restaurantId: order.Cart.restaurantId,
      image,
      content,
      starRating
    });
  };
} 