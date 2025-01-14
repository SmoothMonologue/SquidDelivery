import express from 'express';
import ReviewController from '../../controllers/user/reviews.controller.js';
import ReviewService from '../../services/user/review.service.js';
import reviewRepository from '../../repositories/review.repository.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController(new ReviewService(reviewRepository));

reviewRouter.post('/', reviewController.createReview);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.patch('/:reviewId', reviewController.updateReview);
reviewRouter.delete('/:reviewId', reviewController.deleteReview);

export default reviewRouter;
