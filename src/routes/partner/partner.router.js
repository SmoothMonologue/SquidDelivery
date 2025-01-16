import express from 'express';
import { authenticatePartner } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticatePartner, async (req, res) => {
  const partner = req.partner;
  const partnerInfo = await prisma.partner.findUnique({
    where: { id: partner.id },
  });
  return res.status(200).json({ message: '사장님 정보불러오기 성공', data: partnerInfo });
});
router.put('/:restaurantsId', authenticatePartner, async () => {});
router.delete('/:restaurantsId', authenticatePartner, async () => {});

export default router;
