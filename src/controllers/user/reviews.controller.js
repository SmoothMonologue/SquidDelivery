import { HTTP_STATUS } from '../../constants/http-status.constant.js';

class ReviewController {
    #reviewService;
    
    constructor(reviewService) {
      this.#reviewService = reviewService;
    }
  
    createReview = async (req, res, next) => {
      try {
        const { orderId, image, content, starRating } = req.body;
        const userId = req.user.id;
  
        const result = await this.#reviewService.createReview({
          userId,
          orderId,
          image,
          content,
          starRating
        });
  
        return res.status(HTTP_STATUS.CREATED).json(result);
      } catch (error) {
        next(error);
      }
    };
}

export default ReviewController;
