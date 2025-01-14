import { prisma } from '../../utils/prisma/index.js';

class cartRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  //장바구니 생성
  createCart = async ({ userId, restaurantId }) => {
    return await this.#orm.cart.create({
      data: {
        userId: Number(userId),
        restaurantId: Number(restaurantId),
        menuInfo: [],
      },
    });
  };

  //선택한 장바구니
  usingCart = async (cartId) => {
    return await this.#orm.cart.findUnique({
      where: {
        id: Number(cartId),
      },
    });
  };

  //사용자의 장바구니들
  usingCarts = async (userId) => {
    return await this.#orm.cart.findMany({
      where: {
        userId: Number(userId),
      },
    });
  };

  //장바구니에 담을 메뉴 정보
  chosenMenu = async (menuId) => {
    return await this.#orm.menu.findUnique({
      where: {
        id: Number(menuId),
      },
      select: {
        name: true,
        price: true,
      },
    });
  };

  //장바구니에 메뉴 추가
  addMenu = async ({ cartId, infoOfChosenMenu }) => {
    return await this.#orm.cart.update({
      where: {
        id: Number(cartId),
      },
      data: {
        menuInfo: infoOfChosenMenu,
      },
    });
  };
  newMenuOfCart = async ({ cartId, menuId }) => {
    return await this.#orm.menuCart.create({
      data: {
        cartId: Number(cartId),
        menuId: Number(menuId),
      },
    });
  };

  //장바구니 삭제
  deleteCart = async (cartId) => {
    return await this.#orm.cart.delete({
      where: {
        id: Number(cartId),
      },
    });
  };
}

export default new cartRepository(prisma);
