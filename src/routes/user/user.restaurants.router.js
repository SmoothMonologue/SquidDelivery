import express from 'express';
import UserRestaurantController from '../../controllers/user/user.restaurants.controller.js';

const userRestaurantRouter = express.Router();

// 업장 목록 조회 (고객용)
userRestaurantRouter.get('/', UserRestaurantController.getAllRestaurants);

// 키워드 기반 업장 조회 API
userRestaurantRouter.get('/search', UserRestaurantController.getRestaurantsByKeyword);

export default userRestaurantRouter;
