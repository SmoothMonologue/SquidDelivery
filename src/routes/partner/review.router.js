import express from 'express';
import { prisma } from '../../utils/prisma/index.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

const reviewRouter = express.Router();

// 리뷰에 댓글 작성
reviewRouter.post('/:reviewId/comments', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { partnerId, comment } = req.body;

    // 리뷰 존재 확인
    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) },
      include: { Restaurant: true }
    });

    if (!review) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.REVIEWS.COMMON.NOT_FOUND
      });
    }

    // 파트너가 해당 레스토랑의 주인인지 확인
    const restaurant = await prisma.restaurant.findUnique({
      where: { partnerId }
    });

    if (!restaurant || review.restaurantId !== restaurant.id) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        partnerId,
        reviewId: Number(reviewId),
        comment
      }
    });

    return res.status(HTTP_STATUS.CREATED).json({ 
      message: MESSAGES.COMMENTS.CREATE.SUCCEED,
      data: newComment 
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.CREATE.FAILED
    });
  }
});

// 특정 리뷰의 댓글 조회
reviewRouter.get('/:reviewId/comments', async (req, res) => {
  try {
    const { reviewId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { reviewId: Number(reviewId) },
      include: {
        Partner: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(HTTP_STATUS.OK).json({ data: comments });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: '댓글 조회에 실패했습니다.'
    });
  }
});

// 댓글 수정
reviewRouter.patch('/:reviewId/comments/:commentId', async (req, res) => {
  try {
    const { reviewId, commentId } = req.params;
    const { comment } = req.body;
    const partnerId = req.user.id; // 인증 미들웨어에서 받아온 파트너 ID

    // 댓글 존재 및 작성자 확인
    const existingComment = await prisma.comment.findUnique({
      where: { 
        id: Number(commentId),
        reviewId: Number(reviewId)
      }
    });

    if (!existingComment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.COMMENTS.COMMON.NOT_FOUND
      });
    }

    if (existingComment.partnerId !== partnerId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED
      });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { comment }
    });

    return res.status(HTTP_STATUS.OK).json({ 
      message: MESSAGES.COMMENTS.UPDATE.SUCCEED,
      data: updatedComment 
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.UPDATE.FAILED
    });
  }
});

// 댓글 삭제
reviewRouter.delete('/:reviewId/comments/:commentId', async (req, res) => {
  try {
    const { reviewId, commentId } = req.params;
    const partnerId = req.user.id; // 인증 미들웨어에서 받아온 파트너 ID

    // 댓글 존재 및 작성자 확인
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) }
    });

    if (!comment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: MESSAGES.COMMENTS.COMMON.NOT_FOUND
      });
    }

    if (comment.partnerId !== partnerId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED
      });
    }

    await prisma.comment.delete({
      where: { id: Number(commentId) }
    });

    return res.status(HTTP_STATUS.OK).json({
      message: MESSAGES.COMMENTS.DELETE.SUCCEED
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: MESSAGES.COMMENTS.DELETE.FAILED
    });
  }
});

export default reviewRouter;
