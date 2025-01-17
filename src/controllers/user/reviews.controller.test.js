import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { ReviewController } from './reviews.controller.js';
import { jest } from '@jest/globals';

class MockReviewService {
  createReview = jest.fn();
  getAllReviews = jest.fn();
  updateReview = jest.fn();
  deleteReview = jest.fn();
}

describe('ReviewController', () => {
  let reviewController;
  let mockReviewService;

  beforeEach(() => {
    mockReviewService = new MockReviewService();
    reviewController = new ReviewController(mockReviewService);
  });

  describe('createReview', () => {
    it('should create a review and return 201 status', async () => {
      const req = {
        user: { id: 1 },
        body: {
          orderId: 123,
          image: 'image_url',
          content: 'Great product!',
          starRating: 5,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockResult = { message: 'Review created successfully' };
      mockReviewService.createReview.mockResolvedValue(mockResult);

      await reviewController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {
        user: { id: 1 },
        body: {
          orderId: 123,
          image: 'image_url',
          content: 'Great product!',
          starRating: 5,
        },
      };
      const next = jest.fn();
      mockReviewService.createReview.mockRejectedValue(new Error('Database error'));

      await reviewController.createReview(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getAllReviews', () => {
    it('should return all reviews and status 200', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockReviews = [{ id: 1, content: 'Great product!' }];
      mockReviewService.getAllReviews.mockResolvedValue(mockReviews);

      await reviewController.getAllReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {};
      const next = jest.fn();
      mockReviewService.getAllReviews.mockRejectedValue(new Error('Database error'));

      await reviewController.getAllReviews(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateReview', () => {
    it('should update a review and return 200 status', async () => {
      const req = {
        params: { reviewId: 1 },
        user: { id: 1 },
        body: {
          content: 'Updated review',
          starRating: 4,
          image: 'new_image_url',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockResult = { message: 'Review updated successfully' };
      mockReviewService.updateReview.mockResolvedValue(mockResult);

      await reviewController.updateReview(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {
        params: { reviewId: 1 },
        user: { id: 1 },
        body: {
          content: 'Updated review',
          starRating: 4,
          image: 'new_image_url',
        },
      };
      const next = jest.fn();
      mockReviewService.updateReview.mockRejectedValue(new Error('Database error'));

      await reviewController.updateReview(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteReview', () => {
    it('should delete a review and return 200 status', async () => {
      const req = {
        params: { reviewId: 1 },
        user: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockResult = { message: 'Review deleted successfully' };
      mockReviewService.deleteReview.mockResolvedValue(mockResult);

      await reviewController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle errors and pass to the next middleware', async () => {
      const req = {
        params: { reviewId: 1 },
        user: { id: 1 },
      };
      const next = jest.fn();
      mockReviewService.deleteReview.mockRejectedValue(new Error('Database error'));

      await reviewController.deleteReview(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
