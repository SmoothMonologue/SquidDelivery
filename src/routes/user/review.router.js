import express from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import ReviewController from '../../controllers/user/reviews.controller.js';
import reviewService from '../../services/user/review.service.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController(reviewService);

reviewRouter.post('/', authenticateUser,reviewController.createReview);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.patch('/:reviewId', authenticateUser, reviewController.updateReview);
reviewRouter.delete('/:reviewId', authenticateUser, reviewController.deleteReview);

export default reviewRouter;
