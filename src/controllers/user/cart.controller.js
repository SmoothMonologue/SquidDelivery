import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import cartService from '../../services/user/cart.service.js';

class cartController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  //새로운 장바구니 추가
  createCart = async (req, res) => {
    try {
      const userId = req.user.id;
      //왠지 밑에 걸로 하면 안 될 것 같은 직감,  되면 말고.
      const { restaurantId } = req.body;
      //const restaurantId = req.body.restaurantId;
      const newCart = await this.#service.createCart({ userId, restaurantId });

      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.CARTS.CREATE.SUCCEED,
        data: newCart,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.CARTS.CREATE.FAILED,
      });
    }
  };

  //장바구니에 선택한 메뉴 추가
  newMenuOfCart = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const { menuId } = req.body;
      const usingCart = await this.#service.usingCart(cartId);
      //카트 존재 여부, 로그인한 사용자의 카트인지 검증
      //컨트롤러에서 하는 거 맞나?
      if (!usingCart) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.CARTS.COMMON.NOT_FOUND,
        });
      } else if (usingCart.userId !== Number(userId)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          message: MESSAGES.CARTS.COMMON.NOT_AUTHORIZED,
        });
      }

      this.#service.addMenu({ cartId, menuId });

      const newMenuOfCart = this.#service.newMenuOfCart({ cartId, menuId });

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.CARTS.UPDATE.SUCCEED,
        data: newMenuOfCart,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.COMMENTS.UPDATE.FAILED,
      });
    }
  };

  //장바구니 조회
  usingCarts = async (req, res) => {
    try {
      const userId = req.user.id;
      const usingCarts = await this.#service.usingCarts(userId);
      if (!usingCarts) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.CARTS.COMMON.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.CARTS.COMMON.SUCCEED,
        data: usingCarts,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.CARTS.COMMON.NOT_FOUND,
      });
    }
  };

  //장바구니 삭제
  deleteCart = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const usingCart = await this.#service.usingCart(cartId);

      //카트 존재 여부, 로그인한 사용자의 카트인지 검증
      if (!usingCart) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.CARTS.COMMON.NOT_FOUND,
        });
      } else if (usingCart.userId !== Number(userId)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          message: MESSAGES.CARTS.COMMON.NOT_AUTHORIZED,
        });
      }

      this.#service.deleteCart(cartId);

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.CARTS.DELETE.SUCCEED,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.CARTS.DELETE.FAILED,
      });
    }
  };
}

export default new cartController(cartService);
