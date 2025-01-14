import express from 'express';
import partnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// authorization 미들웨어를 통해 파트너 인증 확인
router.post('/', authenticateUser, partnerRestaurantController.createRestaurant);
router.get('/:partnerId',  partnerRestaurantController.getRestaurants);
router.put('/:restaurantsId',  partnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId',  partnerRestaurantController.deleteRestaurant);

export default router;
