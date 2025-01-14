import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { restaurantAuthMiddleware } from '../../middlewares/restaurant-auth.middleware.js';
import CommentController from '../../controllers/partner/comments.controller.js';
import commentService from '../../services/partner/comment.service.js';

const commentRouter = express.Router();
const commentController = new CommentController(commentService);

commentRouter.post('/',authenticatePartner, restaurantAuthMiddleware, commentController.createComment);
commentRouter.get('/', commentController.getAllComments);
commentRouter.patch('/:commentId', authenticatePartner, restaurantAuthMiddleware, commentController.updateComment);
commentRouter.delete('/:commentId', authenticatePartner, restaurantAuthMiddleware, commentController.deleteComment);

export default commentRouter;
