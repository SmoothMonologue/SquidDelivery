import express from 'express';
import PartnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';

const partnerRestaurantRouter = express.Router();

partnerRestaurantRouter.use(authenticatePartner);

partnerRestaurantRouter.post('/', PartnerRestaurantController.createRestaurant);
partnerRestaurantRouter.patch('/:restaurantId', PartnerRestaurantController.updateRestaurant);
partnerRestaurantRouter.delete('/:restaurantId', PartnerRestaurantController.deleteRestaurant);
partnerRestaurantRouter.get('/:partnerId/restaurants', PartnerRestaurantController.getRestaurants);

export default partnerRestaurantRouter;
