import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { UserRestaurantController } from '../../controllers/user/user.restaurants.controller.js';
import { UserRestaurantRepository } from '../../repositories/user/user.restaurants.repository.js';
import { UserRestaurantService } from '../../services/user/user.restaurants.service.js';

const userRestaurantRouter = express.Router();

const userRestaurantRepository = new UserRestaurantRepository(prisma);
const userRestaurantService = new UserRestaurantService(userRestaurantRepository);
const userRestaurantController = new UserRestaurantController(userRestaurantService);

// 업장 목록 조회 (고객용)
userRestaurantRouter.get('/', authenticateUser, userRestaurantController.getAllRestaurants);

// 키워드 기반 업장 조회 API
userRestaurantRouter.get('/search', userRestaurantController.getRestaurantsByKeyword);

// 레스토랑 리뷰 조회(고객용)
userRestaurantRouter.get('/:restaurantId/reviews', userRestaurantController.getRestaurantReviews);

export default userRestaurantRouter;
