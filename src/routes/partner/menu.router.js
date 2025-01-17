import { prisma } from '../../utils/prisma/index.js';
import { Menurepository } from '../../repositories/partner/menu.repository.js';
import { Menuservice } from '../../services/partner/menu.service.js';
import { MenuControllerPartner } from '../../controllers/partner/menu.controller.js';
import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { restaurantAuthMiddleware } from '../../middlewares/restaurant-auth.middleware.js';
// Express Router 설정
const menuRouter = express.Router();
const menuRepository = new Menurepository(prisma);
const menuService = new Menuservice(menuRepository);
const menuController = new MenuControllerPartner(menuService);

// 메뉴 생성
menuRouter.post('/', authenticatePartner, restaurantAuthMiddleware, menuController.createMenu);
// 유저와 업주 둘다 사용가능한 메뉴조회
menuRouter.get(
  '/:restaurantId',
  authenticatePartner,
  restaurantAuthMiddleware,
  menuController.getRestaurantMenus,
);
// 메뉴 수정
menuRouter.patch(
  '/:menuId',
  authenticatePartner,
  restaurantAuthMiddleware,
  menuController.updateMenu,
);
// 메뉴 삭제
menuRouter.delete(
  '/:menuId',
  authenticatePartner,
  restaurantAuthMiddleware,
  menuController.deleteMenu,
);

export default menuRouter;
