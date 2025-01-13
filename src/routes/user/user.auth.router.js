import express from 'express';
import userAuthController from '../../controllers/user/user.auth.controller.js';
import { signUpValidator } from '../../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../../middlewares/validators/sign-in-validator.middleware.js';

const router = express.Router();

router.post('/signup', signUpValidator, userAuthController.signup);
router.post('/login', signInValidator, userAuthController.login);

export default router; 