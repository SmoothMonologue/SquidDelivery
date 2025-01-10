import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

const reviewRouter = express.Router();

// 리뷰 작성
reviewRouter.post('/', async (req, res) => {
  try {
    const { orderId, image, content, starRating } = req.body;
    const userId = req.user.id; // 인증 미들웨어에서 받아온 사용자 ID

    // 주문 정보 확인
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { Cart: true }
    });

    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_FOUND
      });
    }

    // 이미 리뷰가 있는지 확인
    const existingReview = await prisma.review.findUnique({
      where: { orderId }
    });

    if (existingReview) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: MESSAGES.REVIEWS.COMMON.ALREADY_EXISTS
      });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        orderId,
        restaurantId: order.Cart.restaurantId,
        restaurantsId: order.Cart.restaurantId,
        image,
        content,
        starRating
      }
    });

    return res.status(HTTP_STATUS.CREATED).json({ 
      message: MESSAGES.REVIEWS.CREATE.SUCCEED,
      data: review 
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.REVIEWS.CREATE.FAILED
    });
  }
});

// 리뷰 조회
reviewRouter.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        Comment: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(HTTP_STATUS.OK).json({ 
      message: MESSAGES.REVIEWS.READ_LIST.SUCCEED,
      data: reviews 
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.REVIEWS.READ_LIST.FAILED
    });
  }
});

// 리뷰 수정
reviewRouter.patch('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { content, starRating, image } = req.body;
    const userId = req.user.id; // 인증 미들웨어에서 받아온 사용자 ID

    // 리뷰 존재 및 작성자 확인
    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) }
    });

    if (!review) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_FOUND
      });
    }

    if (review.userId !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id: Number(reviewId) },
      data: { content, starRating, image }
    });

    return res.status(HTTP_STATUS.OK).json({ 
      message: MESSAGES.REVIEWS.UPDATE.SUCCEED,
      data: updatedReview 
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.REVIEWS.UPDATE.FAILED
    });
  }
});

// 리뷰 삭제
reviewRouter.delete('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id; // 인증 미들웨어에서 받아온 사용자 ID

    // 리뷰 존재 및 작성자 확인
    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) }
    });

    if (!review) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_FOUND
      });
    }

    if (review.userId !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_AUTHORIZED
      });
    }

    await prisma.review.delete({
      where: { id: Number(reviewId) }
    });

    return res.status(HTTP_STATUS.OK).json({
      message: MESSAGES.REVIEWS.DELETE.SUCCEED
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.REVIEWS.DELETE.FAILED
    });
  }
});

export default reviewRouter;