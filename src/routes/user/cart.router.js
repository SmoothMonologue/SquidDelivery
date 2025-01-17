import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { CartController } from '../../controllers/user/cart.controller.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { CartRepository } from '../../repositories/user/cart.repository.js';
import { CartService } from '../../services/user/cart.service.js';

const cartsRouter = express.Router();
const cartRepository = new CartRepository(prisma);
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

//새로운 장바구니 추가
cartsRouter.post('/', authenticateUser, cartController.createCart);

//장바구니에 선택한 메뉴 추가
cartsRouter.post('/:cartId', authenticateUser, cartController.newMenuOfCart);

//사용자의 장바구니 조회
cartsRouter.get('/', authenticateUser, cartController.usingCarts);

//장바구니 삭제
cartsRouter.delete('/:cartId', authenticateUser, cartController.deleteCart);

export default cartsRouter;
