import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';
import { prisma } from '../../utils/prisma/index.js';
import { PartnerInfoController } from '../../controllers/partner/partnerInfo.controller.js';
import { PartnerInfoService } from '../../services/partner/partnerInfo.service.js';
import { PartnerInfoRepository } from '../../repositories/partner/partnerInfo.repository.js';

const router = express.Router();

const partnerInfoRepository = new PartnerInfoRepository(prisma);
const partnerInfoService = new PartnerInfoService(partnerInfoRepository);
const partnerInfoController = new PartnerInfoController(partnerInfoService);

// authorization 미들웨어를 통해 파트너 인증 확인
router.get('/', authenticatePartner, partnerInfoController.getPartnerInfo);
router.put('/', authenticatePartner, partnerInfoController.updatePartnerInfo);
router.delete('/', authenticatePartner, partnerInfoController.deletePartnerInfo);

export default router;
