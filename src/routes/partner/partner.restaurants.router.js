import express from 'express';
import partnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';
import { authorization } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// authorization 미들웨어를 통해 파트너 인증 확인
router.post('/', authorization, partnerRestaurantController.createRestaurant);
router.get('/:partnerId', authorization, partnerRestaurantController.getRestaurants);
router.put('/:restaurantsId', authorization, partnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId', authorization, partnerRestaurantController.deleteRestaurant);

export default router;
