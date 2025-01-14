import menuController from '../../controllers/menu/menu.controller.js';
import express from 'express';
// Express Router 설정
const menuRouter = express.Router();

menuRouter.post('/partners/menu', menuController.createMenu);
menuRouter.get('/restaurants/:restaurantId/menu', menuController.getRestaurantMenus);
menuRouter.patch('/partners/menu/:menuId', menuController.updateMenu);
menuRouter.delete('/partners/menu/:menuId', menuController.deleteMenu);

export default menuRouter;
