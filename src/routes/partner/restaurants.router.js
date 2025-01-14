import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import PartnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';

const router = express.Router();

// 파트너 전용 레스토랑 라우트
router.post('/', authenticatePartner, PartnerRestaurantController.createRestaurant);
router.get('/:partnerId', authenticatePartner, PartnerRestaurantController.getRestaurants);
router.put('/:restaurantsId', authenticatePartner, PartnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId', authenticatePartner, PartnerRestaurantController.deleteRestaurant);

export default router;