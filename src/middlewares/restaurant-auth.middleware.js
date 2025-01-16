import { prisma } from '../utils/prisma/index.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export const restaurantAuthMiddleware = async (req, res, next) => {
  try {
    const partnerId = req.partner.id; // authenticatePartner 미들웨어에서 설정된 값

    // 파트너의 레스토랑 찾기
    const restaurant = await prisma.restaurant.findFirst({
      where: { partnerId },
    });

    if (!restaurant) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.RESTAURANTS.COMMON.NOT_FOUND,
      });
    }

    // 레스토랑 정보를 요청 객체에 저장
    req.restaurant = restaurant;
    next();
  } catch (error) {
    next(error);
  }
};
