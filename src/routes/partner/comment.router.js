import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { restaurantAuthMiddleware } from '../../middlewares/restaurant-auth.middleware.js';
import { CommentController } from '../../controllers/partner/comments.controller.js';
import { CommentRepository } from '../../repositories/partner/comment.repository.js';
import { CommentService } from '../../services/partner/comment.service.js';
import { prisma } from '../../utils/prisma/index.js';

const commentRepository = new CommentRepository(prisma);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

const commentRouter = express.Router();

commentRouter.post(
  '/',
  authenticatePartner,
  restaurantAuthMiddleware,
  commentController.createComment,
);
commentRouter.get(
  '/',
  authenticatePartner,
  restaurantAuthMiddleware,
  commentController.getAllComments,
);
commentRouter.patch(
  '/:commentId',
  authenticatePartner,
  restaurantAuthMiddleware,
  commentController.updateComment,
);
commentRouter.delete(
  '/:commentId',
  authenticatePartner,
  restaurantAuthMiddleware,
  commentController.deleteComment,
);

export default commentRouter;
