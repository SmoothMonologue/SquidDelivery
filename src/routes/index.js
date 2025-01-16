import { Router } from 'express';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import partnerRouter from './partner.router.js';
import rankingRouter from './ranking.router.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/partners', partnerRouter);
router.use('/ranking', rankingRouter);

export default router;
