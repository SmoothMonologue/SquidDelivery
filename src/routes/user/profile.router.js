import express from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import profileController from '../../controllers/user/profile.controller.js';

const profileRouter = express.Router();

//내 프로필
profileRouter.get('/', authenticateUser, profileController.getProfile);

//내 프로필 수정
profileRouter.patch('/', authenticateUser, profileController.setProfile);

//회원 탈퇴
profileRouter.delete('/', authenticateUser, profileController.resign);

export default profileRouter;
