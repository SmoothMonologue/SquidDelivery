import prisma from './utils/prisma/index.js';

class cartRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createCart = async ({ userId, restaurantId }) => {
    return await this.#orm.cart.create({
      data: {
        userId: Number(userId),
        restaurantId: Number(restaurantId),
        menuInfo: [],
      },
    });
  };

  usingCart = async (cartId) => {
    return await this.#orm.cart.findUnique({
      where: {
        id: Number(cartId),
      },
    });
  };

  usingCarts = async (userId) => {
    return await this.#orm.cart.findMany({
      where: {
        userId: Number(userId),
      },
    });
  };

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

  newMenuOfCart = async (cartId, menuId) => {
    return await this.#orm.menuCart.create({
      data: {
        cartId: Number(cartId),
        menuId: Number(menuId),
      },
    });
  };

  deleteCart = async (cartId) => {
    return await this.#orm.cart.delete({
      where: {
        id: Number(cartId),
      },
    });
  };
}

export default new cartRepository(prisma);
