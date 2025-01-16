// import Menucontrolleruser from '../../controllers/user/user.restaurants.controller.js';
import { prisma } from '../../utils/prisma/index.js';
import { Menurepository } from '../../repositories/partner/menu.repository.js';
import { Menuservice } from '../../services/partner/menu.service.js';
import { Menucontrollerpartner } from '../../controllers/partner/menu.controller.js';
import express from 'express';
// Express Router 설정
const menuRouter = express.Router();
const menuRepository = new Menurepository(prisma);
const menuService = new Menuservice(menuRepository);
const menuController = new Menucontrollerpartner(menuService);

// 메뉴 생성
menuRouter.post('/', menuController.createMenu);
// 유저와 업주 둘다 사용가능한 메뉴조회
menuRouter.get('/:restaurantId', menuController.getRestaurantMenus);
// 메뉴 수정
menuRouter.patch('/:menuId', menuController.updateMenu);
// 메뉴 삭제
menuRouter.delete('/:menuId', menuController.deleteMenu);

export default menuRouter;
