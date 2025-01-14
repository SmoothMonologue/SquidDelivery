import express from 'express';
import cardController from '../../controllers/card.controller.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';

const cartsRouter = express.Router();

//새로운 장바구니 추가
cartsRouter.post('/', authenticateUser, cardController.createCart);

//장바구니에 선택한 메뉴 추가
cartsRouter.post('/:cartId', authenticateUser, cardController.newMenuOfCart);

//사용자의 장바구니 조회
cartsRouter.get('/', authenticateUser, cardController.usingCarts);

//장바구니 삭제
cartsRouter.delete('/:cartId', authenticateUser, cardController.deleteCart);

export default cartsRouter;
