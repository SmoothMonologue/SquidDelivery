import Menucontrolleruser from '../../controllers/user/user.restaurants.controller.js';
import Menucontrollerpartner from '../../controllers/partner/menu.controller.js';
import express from 'express';
// Express Router 설정
const menuRouter = express.Router();

// 메뉴 생성
menuRouter.post('/', Menucontrollerpartner.createMenu);
// 유저와 업주 둘다 사용가능한 메뉴조회
menuRouter.get('/:restaurantId', Menucontrollerpartner.getRestaurantMenus);
// 메뉴 수정
menuRouter.patch('/:menuId', Menucontrollerpartner.updateMenu);
// 메뉴 삭제
menuRouter.delete('/:menuId', Menucontrollerpartner.deleteMenu);

export default menuRouter;
