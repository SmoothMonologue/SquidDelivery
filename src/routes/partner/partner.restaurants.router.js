import express from 'express';
import PartnerRestaurantController from '../../controllers/partner/partner.restaurants.controller.js';

const partnerRestaurantRouter = express.Router();

partnerRestaurantRouter.post('/', PartnerRestaurantController.createRestaurant);
partnerRestaurantRouter.patch('/:restaurantsId', PartnerRestaurantController.updateRestaurant);
partnerRestaurantRouter.delete('/:restaurantsId', PartnerRestaurantController.deleteRestaurant);
partnerRestaurantRouter.get('/:partnerId/restaurants', PartnerRestaurantController.getRestaurants);

export default partnerRestaurantRouter;
