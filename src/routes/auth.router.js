import express from 'express';
import {
  signUpUserValidator,
  signUpPartnerValidator,
} from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserRepository } from '../repositories/user/user.repository.js';
import { PartnerRepository } from '../repositories/partner/partner.repository.js';
import { AuthService } from '../services/auth.service.js';
import { prisma } from '../utils/prisma/index.js';
    
const userRepository = new UserRepository(prisma);
const partnerRepository = new PartnerRepository(prisma);
const authService = new AuthService(userRepository, partnerRepository);
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.post('/users/sign-up', signUpUserValidator, authController.userSignUp);

authRouter.post('/partners/sign-up', signUpPartnerValidator, authController.partnerSignUp);

authRouter.post('/sign-in', signInValidator, authController.signIn);

authRouter.post('/sign-out', authController.signOut);

export default authRouter;
