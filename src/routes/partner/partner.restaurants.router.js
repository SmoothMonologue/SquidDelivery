import express from 'express';
import partnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// authorization 미들웨어를 통해 파트너 인증 확인
router.post('/', authenticatePartner, partnerRestaurantController.createRestaurant);
router.get('/', authenticatePartner, partnerRestaurantController.getRestaurants);
router.put('/:restaurantsId', authenticatePartner, partnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId', authenticatePartner, partnerRestaurantController.deleteRestaurant);
router.get('/menu', authenticatePartner, partnerRestaurantController.getMenu);

export default router;
