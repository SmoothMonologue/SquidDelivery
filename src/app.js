import express from 'express';
import apiRouter from './routers/index.js';
import { SERVER_PORT } from './constants/env.constant.js';

const app = express();

app.use(express.json());

// postsRoutes를 /api/posts Path에 연결
app.use('/api', apiRouter);

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}포트로 서버가 실행되었습니다.`);
});
