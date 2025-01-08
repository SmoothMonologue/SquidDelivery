import express from "express";
import apiRouter from './routers/index.js';

const app = express();
const PORT = 3001;

app.use(express.json());

// postsRoutes를 /api/posts Path에 연결
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
