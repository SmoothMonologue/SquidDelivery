import express from 'express';
import RankingController from '../controllers/ranking.controller.js';
import RankingService from '../services/ranking.service.js';
import RankingRepository from '../repositories/ranking.repository.js';

const rankingRepository = new RankingRepository(prisma);
const rankingService = new RankingService(rankingRepository);
const rankingController = new RankingController(rankingService);
const rankingRouter = express.Router();

rankingRouter.get('/', rankingController.getRanking);

export default rankingRouter;
