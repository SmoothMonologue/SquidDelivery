import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
export class CustomError extends Error {
  status;
  message;
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // joi 유효성 검사 에러
  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: err.message,
    });
  }

  // JWT 관련 에러
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: MESSAGES.AUTH.COMMON.JWT.INVALID,
    });
  }

  // Prisma 관련 에러
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: '데이터베이스 작업 중 오류가 발생했습니다.',
    });
  }

  // return res.status(err.status).json(err.message);
  // 그 외 예상치 못한 에러
  // return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
  //   status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  //   message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  //   error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  // });
  return res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};
