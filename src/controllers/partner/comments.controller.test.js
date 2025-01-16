import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { CommentController } from './comments.controller.js';
import { beforeEach, describe, expect, jest } from '@jest/globals';

class MockCommentService {
  createComment = jest.fn();
  getAllComments = jest.fn();
  updateComment = jest.fn();
  deleteComment = jest.fn();
}

describe('CommentController', () => {
  let commentController;
  let mockCommentService;

  beforeEach(() => {
    mockCommentService = new MockCommentService();
    commentController = new CommentController(mockCommentService);
  });

  describe('createComment', () => {
    it('should create a new comment and return 201 status', async () => {
      const req = {
        body: { reviewId: 1, comment: 'Great food!' },
        restaurant: { id: 2 },
        partner: { id: 3 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockCommentService.createComment.mockResolvedValue({ success: true });

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors and call next middleware', async () => {
      const req = {
        body: { reviewId: 1, comment: 'Great food!' },
        restaurant: { id: 2 },
        partner: { id: 3 },
      };

      const res = {};
      const next = jest.fn();

      mockCommentService.createComment.mockRejectedValue(new Error('Database error'));

      await commentController.createComment(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getAllComments', () => {
    it('should return all comments and 200 status', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockCommentService.getAllComments.mockResolvedValue([{ id: 1, comment: 'Nice!' }]);

      await commentController.getAllComments(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, comment: 'Nice!' }]);
    });

    it('should handle errors and call next middleware', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      mockCommentService.getAllComments.mockRejectedValue(new Error('Database error'));

      await commentController.getAllComments(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateComment', () => {
    it('should update a comment and return 200 status', async () => {
      const req = {
        params: { commentId: 1 },
        body: { comment: 'Updated comment!' },
        partner: { id: 3 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockCommentService.updateComment.mockResolvedValue({ success: true });

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors and call next middleware', async () => {
      const req = {
        params: { commentId: 1 },
        body: { comment: 'Updated comment!' },
        partner: { id: 3 },
      };

      const res = {};
      const next = jest.fn();

      mockCommentService.updateComment.mockRejectedValue(new Error('Database error'));

      await commentController.updateComment(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment and return 200 status', async () => {
      const req = {
        params: { commentId: 1 },
        partner: { id: 3 },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockCommentService.deleteComment.mockResolvedValue({ success: true });

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors and call next middleware', async () => {
      const req = {
        params: { commentId: 1 },
        partner: { id: 3 },
      };

      const res = {};
      const next = jest.fn();

      mockCommentService.deleteComment.mockRejectedValue(new Error('Database error'));

      await commentController.deleteComment(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
