import express from 'express';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import partnerRouter from './partner.router.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/partners', partnersRouter);

export default apiRouter;
