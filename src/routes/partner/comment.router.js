import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { restaurantAuthMiddleware } from '../../middlewares/restaurant-auth.middleware.js';
import CommentController from '../../controllers/partner/comments.controller.js';


const commentRouter = express.Router();


commentRouter.post('/',authenticatePartner, restaurantAuthMiddleware, CommentController.createComment);
commentRouter.get('/', CommentController.getAllComments);
commentRouter.patch('/:commentId',authenticatePartner, restaurantAuthMiddleware, CommentController.updateComment);
commentRouter.delete('/:commentId',authenticatePartner, restaurantAuthMiddleware, CommentController.deleteComment);

export default commentRouter;
