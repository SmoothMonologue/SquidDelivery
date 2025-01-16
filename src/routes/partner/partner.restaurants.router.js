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
router.post('/', authenticatePartner, (req, res, next) => {
  partnerRestaurantController.createRestaurant(req, res, next);
});
router.get('/', authenticatePartner, (req, res, next) => {
  partnerRestaurantController.getRestaurants(req, res, next);
});
router.put('/:restaurantsId', authenticatePartner, (req, res, next) => {
  partnerRestaurantController.updateRestaurant(req, res, next);
});
router.delete('/:restaurantsId', authenticatePartner, (req, res, next) => {
  partnerRestaurantController.deleteRestaurant(req, res, next);
});
router.get('/menu', authenticatePartner, (req, res, next) => {
  partnerRestaurantController.getMenu(req, res, next);
});

export default router;
