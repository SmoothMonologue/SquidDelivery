import express from "express";
import usersRouter from "./routes/users.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// postsRoutes를 /api/posts Path에 연결
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
