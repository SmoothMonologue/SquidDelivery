import express from 'express';
import CommentController from '../../controllers/partner/comments.controller.js';
import commentService from '../../services/partner/comment.service.js';

const commentRouter = express.Router();
const commentController = new CommentController(commentService);

commentRouter.post('/', commentController.createComment);
commentRouter.get('/', commentController.getAllComments);
commentRouter.patch('/:commentId', commentController.updateComment);
commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;
