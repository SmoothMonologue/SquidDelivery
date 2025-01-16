import { jest } from '@jest/globals';
import { UserRepository } from './user.repository.js';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

describe('UserRepository test', () => {
    let fakeOrm;
    let userRepository;

    const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword123',
        name: '홍길동',
        interest: '한식',
        phoneNumber: '010-1234-5678'
    };

    beforeEach(() => {
        fakeOrm = {
            user: {
                findUnique: jest.fn(),
                create: jest.fn()
            }
        };
        userRepository = new UserRepository(fakeOrm);
    });

    describe('createUser', () => {
        it('회원가입 성공', async () => {
            fakeOrm.user.findUnique.mockResolvedValue(null);
            fakeOrm.user.create.mockResolvedValue(mockUser);

            const result = await userRepository.createUser({
                email: 'test@test.com',
                password: 'password123',
                name: '홍길동',
                interest: '한식',
                phoneNumber: '010-1234-5678'
            });

            expect(result).toEqual(mockUser);
        });

        it('이미 존재하는 이메일로 가입 시도 실패', async () => {
            fakeOrm.user.findUnique.mockResolvedValue(mockUser);

            const result = await userRepository.createUser({
                email: 'test@test.com'
            });

            expect(result.status).toBe(HTTP_STATUS.CONFLICT);
            expect(result.message).toBe(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
        });
    });

    describe('signInUser', () => {
        it('로그인 성공', async () => {
            fakeOrm.user.findUnique.mockResolvedValue(mockUser);

            const result = await userRepository.signInUser({
                email: 'test@test.com'
            });

            expect(result).toEqual(mockUser);
        });

        it('존재하지 않는 이메일로 로그인 시도 실패', async () => {
            fakeOrm.user.findUnique.mockResolvedValue(null);

            const result = await userRepository.signInUser({
                email: 'wrong@test.com'
            });

            expect(result.status).toBe(HTTP_STATUS.NOT_FOUND);
            expect(result.message).toBe(MESSAGES.AUTH.SIGN_IN.FAILED);
        });
    });
}); 