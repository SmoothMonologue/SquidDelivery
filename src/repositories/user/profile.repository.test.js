import { jest } from '@jest/globals';
import ProfileRepository from './profile.repository.js';

describe('ProfileRepository test', () => {
    let fakeOrm;
    let profileRepository;

    const mockUser = {
        id: 1,
        name: '홍길동',
        email: 'test@test.com',
        interest: '한식',
        phoneNumber: '010-1234-5678',
        cash: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        fakeOrm = {
            user: {
                findFirst: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }
        };
        profileRepository = new ProfileRepository(fakeOrm);
    });

    describe('getProfile', () => {
        it('프로필 조회 성공', async () => {
            fakeOrm.user.findFirst.mockResolvedValue(mockUser);

            const result = await profileRepository.getProfile(1);

            expect(fakeOrm.user.findFirst).toHaveBeenCalledWith({
                where: { id: 1 },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    interest: true,
                    createdAt: true,
                    updatedAt: true,
                    cash: true,
                    phoneNumber: true,
                }
            });
            expect(result).toEqual(mockUser);
        });
    });

    describe('setProfile', () => {
        it('프로필 수정 성공', async () => {
            const updateData = {
                name: '김철수',
                email: 'new@test.com',
                phoneNumber: '010-9876-5432',
                interest: '일식'
            };
            const updatedUser = { ...mockUser, ...updateData };
            fakeOrm.user.update.mockResolvedValue(updatedUser);

            const result = await profileRepository.setProfile({
                id: 1,
                profileData: updateData
            });

            expect(fakeOrm.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updateData
            });
            expect(result).toEqual(updatedUser);
        });
    });

    describe('resign', () => {
        it('회원 탈퇴 성공', async () => {
            fakeOrm.user.delete.mockResolvedValue(mockUser);

            const result = await profileRepository.resign(1);

            expect(fakeOrm.user.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockUser);
        });
    });
}); 