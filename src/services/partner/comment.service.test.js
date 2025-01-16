import { jest } from '@jest/globals';
import { CommentService } from './comment.service.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('CommentService test', () => {
    let mockRepository;
    let commentService;

    const mockReview = {
        id: 1,
        restaurantId: 1,
        content: '맛있어요',
        starRating: 5
    };

    const mockComment = {
        id: 1,
        reviewId: 1,
        partnerId: 1,
        comment: '감사합니다'
    };

    beforeEach(() => {
        mockRepository = {
            findReviewById: jest.fn(),
            findCommentByReviewId: jest.fn(),
            createComment: jest.fn(),
            findAllComments: jest.fn(),
            updateComment: jest.fn(),
            deleteComment: jest.fn()
        };
        commentService = new CommentService(mockRepository);
    });

    describe('createComment', () => {
        const commentData = {
            restaurantId: 1,
            reviewId: 1,
            comment: '감사합니다',
            partnerId: 1
        };

        it('댓글 생성 성공', async () => {
            mockRepository.findReviewById.mockResolvedValue(mockReview);
            mockRepository.findCommentByReviewId.mockResolvedValue(null);
            mockRepository.createComment.mockResolvedValue(mockComment);

            const result = await commentService.createComment(commentData);

            expect(result.message).toBe(MESSAGES.COMMENTS.CREATE.SUCCEED);
            expect(result.data).toEqual(mockComment);
        });

        it('존재하지 않는 리뷰에 댓글 작성 실패', async () => {
            mockRepository.findReviewById.mockResolvedValue(null);

            await expect(async () => {
                await commentService.createComment(commentData);
            }).rejects.toThrow(MESSAGES.REVIEWS.COMMON.NOT_FOUND);
        });

        it('다른 식당의 리뷰에 댓글 작성 실패', async () => {
            mockRepository.findReviewById.mockResolvedValue({
                ...mockReview,
                restaurantId: 999
            });

            await expect(async () => {
                await commentService.createComment(commentData);
            }).rejects.toThrow(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
        });

        it('이미 댓글이 존재하는 경우 실패', async () => {
            mockRepository.findReviewById.mockResolvedValue(mockReview);
            mockRepository.findCommentByReviewId.mockResolvedValue(mockComment);

            await expect(async () => {
                await commentService.createComment(commentData);
            }).rejects.toThrow(MESSAGES.COMMENTS.CREATE.ALREADY_EXISTS);
        });
    });

    describe('getAllComments', () => {
        it('전체 댓글 조회 성공', async () => {
            const mockComments = [mockComment];
            mockRepository.findAllComments.mockResolvedValue(mockComments);

            const result = await commentService.getAllComments();

            expect(result.message).toBe(MESSAGES.COMMENTS.READ_LIST.SUCCEED);
            expect(result.data).toEqual(mockComments);
        });
    });

    describe('updateComment', () => {
        const updateData = {
            commentId: 1,
            partnerId: 1,
            comment: '정말 감사합니다'
        };

        it('댓글 수정 성공', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue(mockComment);
            mockRepository.updateComment.mockResolvedValue({
                ...mockComment,
                comment: updateData.comment
            });

            const result = await commentService.updateComment(updateData);

            expect(result.message).toBe(MESSAGES.COMMENTS.UPDATE.SUCCEED);
            expect(result.data.comment).toBe(updateData.comment);
        });

        it('존재하지 않는 댓글 수정 실패', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue(null);

            await expect(async () => {
                await commentService.updateComment(updateData);
            }).rejects.toThrow(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
        });

        it('권한 없는 파트너의 댓글 수정 실패', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue({
                ...mockComment,
                partnerId: 999
            });

            await expect(async () => {
                await commentService.updateComment(updateData);
            }).rejects.toThrow(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
        });
    });

    describe('deleteComment', () => {
        const deleteData = {
            commentId: 1,
            partnerId: 1
        };

        it('댓글 삭제 성공', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue(mockComment);

            const result = await commentService.deleteComment(deleteData);

            expect(result.message).toBe(MESSAGES.COMMENTS.DELETE.SUCCEED);
        });

        it('존재하지 않는 댓글 삭제 실패', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue(null);

            await expect(async () => {
                await commentService.deleteComment(deleteData);
            }).rejects.toThrow(MESSAGES.COMMENTS.COMMON.NOT_FOUND);
        });

        it('권한 없는 파트너의 댓글 삭제 실패', async () => {
            mockRepository.findCommentByReviewId.mockResolvedValue({
                ...mockComment,
                partnerId: 999
            });

            await expect(async () => {
                await commentService.deleteComment(deleteData);
            }).rejects.toThrow(MESSAGES.COMMENTS.COMMON.NOT_AUTHORIZED);
        });
    });
}); 