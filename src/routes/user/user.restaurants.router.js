import express from 'express';
import UserRestaurantController from '../controllers/user.restaurant.controller.js';

const userRestaurantRouter = express.Router();

// 업장 목록 조회 (고객용)
userRestaurantRouter.get('/', UserRestaurantController.getAllRestaurants);

export default userRestaurantRouter;
