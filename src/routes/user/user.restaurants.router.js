import express from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import UserRestaurantController from '../../controllers/user/user.restaurants.controller.js';

const userRestaurantRouter = express.Router();

// 업장 목록 조회 (고객용)
userRestaurantRouter.get('/', authenticateUser, (req, res, next) =>
  UserRestaurantController.getAllRestaurants(req, res, next),
);

export default userRestaurantRouter;
