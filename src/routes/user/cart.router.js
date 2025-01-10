import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

const cartsRouter = express.Router();

//새로운 장바구니 추가
cartsRouter.post('/', authorization, async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId } = req.body;
    const newCart = await prisma.cart.create({
      data: {
        userId: Number(userId),
        restaurantId: Number(restaurantId),
        menuInfo: '',
      },
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: newCart,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.CREATE.FAILED,
    });
  }
});

//장바구니에 선택한 메뉴 추가
cartsRouter.post('/:cartId', authorization, async (req, res) => {
  try {
    const cartId = req.params.cartId;
    //사용자의 카트인지 검증 필요

    const { menuId } = req.body;
    const usingCart = await prisma.cart.findUnique({
      where: {
        id: Number(cartId),
      },
    });
    const chosenMenu = await prisma.menu.findUnique({
      where: {
        id: Number(menuId),
      },
      select: {
        name: true,
        price: true,
      },
    });
    //존재하지 않는 카트일 경우 리턴

    let infoOfChosenMenu = usingCart.menuInfo;
    infoOfChosenMenu += `메뉴: ${chosenMenu.name}, 가격: ${chosenMenu.price}, `;
    await prisma.cart.update({
      where: {
        id: Number(cartId),
      },
      data: {
        menuInfo: infoOfChosenMenu,
      },
    });

    const newMenuOfCart = await prisma.menuCart.create({
      data: {
        cartId: Number(cartId),
        menuId: Number(menuId),
      },
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: newMenuOfCart,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.CREATE.FAILED,
    });
  }
});

//사용자의 장바구니 조회
cartsRouter.get('/', authorization, async (req, res) => {
  try {
    const userId = req.user.id;
    const usingCart = await prisma.cart.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: usingCart,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.CREATE.FAILED,
    });
  }
});

//장바구니 삭제
cartsRouter.delete('/:cartId', authorization, async (req, res) => {
  try {
    const cartId = req.params.cartId;
    //사용자의 카트인지 검증 필요

    const { menuId } = req.body;
    const usingCart = await prisma.cart.findUnique({
      where: {
        id: Number(cartId),
      },
    });
    const chosenMenu = await prisma.menu.findUnique({
      where: {
        id: Number(menuId),
      },
      select: {
        name: true,
        price: true,
      },
    });
    //존재하지 않는 카트일 경우 리턴

    await prisma.cart.delete({
      where: {
        id: Number(cartId),
      },
    });

    //   const newMenuOfCart = await prisma.menuCart.create({
    //     data: {
    //       cartId: Number(cartId),
    //       menuId: Number(menuId),
    //     },
    //   });

    return res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      //data: newMenuOfCart,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.CREATE.FAILED,
    });
  }
});

export default cartsRouter;
