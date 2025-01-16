import express from 'express';
import rankingController from '../controllers/ranking.controller.js';

const rankingRouter = express.Router();

rankingRouter.get('/', rankingController.getRanking);

export default rankingRouter;
