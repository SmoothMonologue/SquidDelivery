import express from 'express';

const authRouter = express.Router();

authRouter.post('/users/sign-up', async (req, res) => {
  const { name, email, password } = req.body;
});

export default authRouter;
