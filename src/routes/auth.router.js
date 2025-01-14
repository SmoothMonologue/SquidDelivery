import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/users/sign-up', signUpValidator, authController.userSignUp);

authRouter.post('/partners/sign-up', signUpValidator, authController.partnerSignUp);

authRouter.post('/sign-in', signInValidator, authController.signIn);

authRouter.post('/sign-out', authController.signOut);

export default authRouter;
