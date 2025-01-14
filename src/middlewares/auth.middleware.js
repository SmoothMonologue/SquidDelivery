import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

export const authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: '로그인이 필요한 서비스입니다.',
      });
    }

    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
      return res.status(401).json({
        message: '토큰 타입이 일치하지 않습니다.',
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: '토큰이 유효하지 않습니다.',
    });
  }
};
