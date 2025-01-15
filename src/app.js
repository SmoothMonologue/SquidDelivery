import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`포트 ${PORT}로 서버가 실행되었습니다.`);
});
