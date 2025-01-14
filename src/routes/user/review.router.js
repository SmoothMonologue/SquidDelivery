import express from 'express';
import ReviewController from '../../controllers/user/reviews.controller.js';
import reviewService from '../../services/user/review.service.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController(reviewService);

reviewRouter.post('/', reviewController.createReview);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.patch('/:reviewId', reviewController.updateReview);
reviewRouter.delete('/:reviewId', reviewController.deleteReview);

export default reviewRouter;