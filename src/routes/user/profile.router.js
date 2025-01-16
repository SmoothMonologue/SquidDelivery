import express from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { prisma } from '../../utils/prisma/index.js';
import ProfileRepository from '../../repositories/user/profile.repository.js';
import ProfileService from '../../services/user/profile.service.js';
import ProfileController from '../../controllers/user/profile.controller.js';

const profileRouter = express.Router();
const profileRepository = new ProfileRepository(prisma);
const profileService = new ProfileService(profileRepository);
const profileController = new ProfileController(profileService);

//내 프로필
profileRouter.get('/', authenticateUser, profileController.getProfile);

//내 프로필 수정
profileRouter.patch('/', authenticateUser, profileController.setProfile);

//회원 탈퇴
profileRouter.delete('/', authenticateUser, profileController.resign);

export default profileRouter;
