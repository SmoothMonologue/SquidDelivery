import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
      });
    }

    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.EXPIRED,
      });
    }

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: MESSAGES.AUTH.COMMON.JWT.INVALID,
    });
  }
};

export const authenticatePartner = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
      });
    }

    const [tokenType, token] = authorization.split(' ');
    // console.log(tokenType, token);
    if (tokenType !== 'Bearer') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const partner = await prisma.partner.findUnique({
      where: { id: decodedToken.id },
    });
    if (!partner) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
      });
    }

    req.partner = partner;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.COMMON.JWT.EXPIRED,
      });
    }

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: MESSAGES.AUTH.COMMON.JWT.INVALID,
    });
  }
};
