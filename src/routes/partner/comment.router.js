import express from 'express';
import CommentController from '../../controllers/restaurant/comments.controller.js';
import CommentService from '../../services/comment.service.js';
import commentRepository from '../../repositories/comment.repository.js';

const commentRouter = express.Router();
const commentController = new CommentController(new CommentService(commentRepository));

commentRouter.post('/', commentController.createComment);
commentRouter.patch('/:commentId', commentController.updateComment);
commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;
