import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io'; // 수정된 부분
import http from 'http'; // Node.js 기본 내장 모듈
import fs from 'fs/promises'; // 파일 시스템 모듈로, Promise 기반으로 파일을 읽고 쓸 수 있게 해줌
import routes from './routes/index.js';
import dotenv from 'dotenv';

// .env 로드
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const server = http.createServer(app);
// 생성된 http 서버에 Socket.IO를 바인딩 >> 실시간 통신 기능을 추
const io = new Server(server, {
  cors: { origin: '*' }, // 필요한 경우 특정 도메인만
});

// 정적 파일 제공
app.use('/public', express.static('public')); // public 폴더 내의 정적 파일을 제공
app.use(cors()); // CORS 미들웨어 추가 >>  다른 도메인에서의 요청을 허용
app.use(express.json());
app.use('/api', routes);

// 소켓 연결 관리
io.on('connection', (socket) => {
  socket.on('register', (data) => {
    socket.role = data.role; // 역할 저장 (partner 또는 user)
    socket.partnerId = data.partnerId;
    socket.userId = data.userId;

    if (socket.role === 'partner') {
      console.log(socket.role, 'connected', {
        partnerId: socket.partnerId,
      });
    } else if (socket.role === 'user') {
      console.log(socket.role, 'connected', {
        userId: socket.userId,
      });
    }
    // socket.on('status_update', (data) => {
    //   if (socket.role === 'partner') {
    //     // 유저들에게 상태 업데이트 전달
    //     io.emit('status_update', { status: data.status });
    //   }
    // });

    // 새로운 이벤트 추가
    socket.on('message', (message) => {
      console.log('새 메시지 수신:', message);
      io.emit('message', { from: socket.id, text: message });
    });

    socket.on('disconnect', () => {
      if (socket.role === 'partner') {
        console.log(socket.role, ' user disconnected', {
          partnerId: socket.partnerId,
        });
      } else if (socket.role === 'user') {
        console.log(socket.role, ' user disconnected', {
          userId: socket.userId,
        });
      }
    });
  });
});

app.get('/partner', async (req, res) => {
  try {
    const data = await fs.readFile('./public/partner.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});

// 다른 유저페이지
app.get('/user', async (req, res) => {
  try {
    const data = await fs.readFile('./public/user.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});

// 새롭게 추가한 라우트
app.get('/login', async (req, res) => {
  try {
    const data = await fs.readFile('./public/login.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});

app.get('/index', async (req, res) => {
  try {
    const data = await fs.readFile('./public/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.status(500).send('파일을 로드할 수 없습니다.');
  }
});

server.listen(PORT, () => {
  console.log(`서버가  http://localhost:${PORT} 에서 실행되었습니다.`);
});
