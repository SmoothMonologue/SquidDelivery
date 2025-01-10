import express from 'express';
import apiRouter from './routes/index.js';
import { SERVER_PORT } from './constants/env.constant.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}포트로 서버가 실행되었습니다.`);
});
