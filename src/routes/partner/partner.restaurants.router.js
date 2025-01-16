import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { PartnerRestaurantController } from '../../controllers/partner/partner.restaurants.controller.js';
import { PartnerRestaurantRepository } from '../../repositories/partner/partner.restaurants.repository.js';
import { PartnerRestaurantService } from '../../services/partner/partner.restaurants.service.js';
import { prisma } from '../../utils/prisma/index.js';

const router = express.Router();
const partnerRestaurantRepository = new PartnerRestaurantRepository(prisma);
const partnerRestaurantService = new PartnerRestaurantService(partnerRestaurantRepository);
const partnerRestaurantController = new PartnerRestaurantController(partnerRestaurantService);

// authorization 미들웨어를 통해 파트너 인증 확인
router.post('/', authenticatePartner, partnerRestaurantController.createRestaurant);
router.get('/', authenticatePartner, partnerRestaurantController.getRestaurants);
router.put('/:restaurantsId', authenticatePartner, partnerRestaurantController.updateRestaurant);
router.delete('/:restaurantsId', authenticatePartner, partnerRestaurantController.deleteRestaurant);

export default router;
