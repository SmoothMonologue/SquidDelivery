// import cartRepository from '../../repositories/user/cart.repository.js';

export class CartService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  //장바구니 생성
  createCart = async (cartData) => {
    return await this.#repository.createCart(cartData);
  };

  //선택한 장바구니
  usingCart = async (cartId) => {
    return await this.#repository.usingCart(cartId);
  };

  //사용자의 장바구니들
  usingCarts = async (userId) => {
    return await this.#repository.usingCarts(userId);
  };

  //장바구니에 담을 메뉴 정보
  chosenMenu = async (menuId) => {
    return await this.#repository.chosenMenu(menuId);
  };

  //장바구니에 메뉴 추가
  addMenu = async ({ cartId, menuId }) => {
    let infoOfChosenMenu = (await this.usingCart(cartId)).menuInfo;
    infoOfChosenMenu.push(await this.chosenMenu(menuId));

    return await this.#repository.addMenu({ cartId, infoOfChosenMenu });
  };
  newMenuOfCart = async (menuCartData) => {
    return await this.#repository.newMenuOfCart(menuCartData);
  };

  //장바구니 삭제
  deleteCart = async (cartId) => {
    return await this.#repository.deleteCart(cartId);
  };
}

// export default new cartService(cartRepository);
