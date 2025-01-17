import { jest } from '@jest/globals';
import { CommentRepository } from './comment.repository.js';

describe('CommentRepository test', () => {
    let fakePrisma;
    let commentRepository;

    const mockReview = {
        id: 1,
        restaurantId: 1,
        content: '맛있어요',
        Comment: [],
        Restaurant: {
            id: 1,
            partnerId: 1,
            restaurantName: '테스트 레스토랑'
        }
    };

    const mockComment = {
        id: 1,
        partnerId: 1,
        reviewId: 1,
        comment: '감사합니다'
    };

    beforeEach(() => {
        fakePrisma = {
            review: {
                findUnique: jest.fn()
            },
            comment: {
                findUnique: jest.fn(),
                create: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }
        };
        commentRepository = new CommentRepository(fakePrisma);
    });

    describe('findReviewById', () => {
        it('리뷰 조회 성공', async () => {
            fakePrisma.review.findUnique.mockResolvedValue(mockReview);

            const result = await commentRepository.findReviewById(1);

            expect(fakePrisma.review.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    Comment: true,
                    Restaurant: {
                        select: {
                            id: true,
                            partnerId: true,
                            restaurantName: true
                        }
                    }
                }
            });
            expect(result).toEqual(mockReview);
        });
    });

    describe('findCommentByReviewId', () => {
        it('댓글 조회 성공', async () => {
            fakePrisma.comment.findUnique.mockResolvedValue(mockComment);

            const result = await commentRepository.findCommentByReviewId(1);

            expect(fakePrisma.comment.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockComment);
        });
    });

    describe('createComment', () => {
        it('댓글 생성 성공', async () => {
            const commentData = {
                partnerId: 1,
                reviewId: 1,
                comment: '감사합니다'
            };
            fakePrisma.comment.create.mockResolvedValue(mockComment);

            const result = await commentRepository.createComment(commentData);

            expect(fakePrisma.comment.create).toHaveBeenCalledWith({
                data: {
                    partnerId: commentData.partnerId,
                    reviewId: commentData.reviewId,
                    comment: commentData.comment,
                }
            });
            expect(result).toEqual(mockComment);
        });
    });

    describe('findAllComments', () => {
        it('전체 댓글 조회 성공', async () => {
            const mockComments = [mockComment];
            fakePrisma.comment.findMany.mockResolvedValue(mockComments);

            const result = await commentRepository.findAllComments();

            expect(fakePrisma.comment.findMany).toHaveBeenCalledWith({
                include: {
                    Review: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            expect(result).toEqual(mockComments);
        });
    });

    describe('updateComment', () => {
        it('댓글 수정 성공', async () => {
            const updatedComment = { ...mockComment, comment: '정말 감사합니다' };
            fakePrisma.comment.update.mockResolvedValue(updatedComment);

            const result = await commentRepository.updateComment(1, '정말 감사합니다');

            expect(fakePrisma.comment.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { comment: '정말 감사합니다' }
            });
            expect(result).toEqual(updatedComment);
        });
    });

    describe('deleteComment', () => {
        it('댓글 삭제 성공', async () => {
            fakePrisma.comment.delete.mockResolvedValue(mockComment);

            const result = await commentRepository.deleteComment(1);

            expect(fakePrisma.comment.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockComment);
        });
    });
}); 