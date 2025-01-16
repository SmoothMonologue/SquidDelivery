import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import {authenticateUser} from '../../middlewares/auth.middleware.js';
import {ReviewController} from '../../controllers/user/reviews.controller.js';
import {ReviewService} from '../../services/user/review.service.js';
import {ReviewRepository} from '../../repositories/user/review.repository.js';

const reviewRouter = express.Router();
const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

reviewRouter.post('/',authenticateUser, reviewController.createReview);
reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.patch('/:reviewId',authenticateUser, reviewController.updateReview);
reviewRouter.delete('/:reviewId',authenticateUser, reviewController.deleteReview);

export default reviewRouter;
