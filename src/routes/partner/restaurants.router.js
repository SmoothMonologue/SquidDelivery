import express from 'express';
import { authorization } from '../../middlewares/auth.middleware.js';
import PartnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';

const router = express.Router();

// 파트너 전용 레스토랑 라우트
router.post('/', authorization, PartnerRestaurantController.createRestaurant);
router.get('/:partnerId', authorization, PartnerRestaurantController.getRestaurants);
router.put('/:restaurantsId', authorization, PartnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId', authorization, PartnerRestaurantController.deleteRestaurant);

export default router;