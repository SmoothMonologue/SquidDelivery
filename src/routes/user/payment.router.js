import express from 'express';
import { PrismaClient } from '../../utils/prisma/index.js';

const app = express();
const prisma = new PrismaClient();

app.post('/', async (req, res) => {
  const { userId, orderId } = req.body;

  if (!userId || !orderId) {
    return res.status(400).json({ error: 'userId와 orderId를 모두 제공해야 합니다.' });
  }

  try {
    // 트랜잭션 시작
    const result = await prisma.$transaction(async (tx) => {
      // 1. 주문 정보 가져오기
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: {
          cart: {
            include: {
              restaurant: {
                include: { partner: true },
              },
            },
          },
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // 2. 사용자 정보 가져오기
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      if (user.cash < order.priceSum) {
        throw new Error('Insufficient funds');
      }

      // 3. 유저 캐쉬 차감
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          cash: user.cash - order.priceSum,
        },
      });

      // 4. 파트너 캐쉬 추가
      const partner = order.cart.restaurant.partner;
      if (!partner) {
        throw new Error('Partner not found for the restaurant');
      }

      const updatedPartner = await tx.partner.update({
        where: { id: partner.id },
        data: {
          cash: partner.cash + order.priceSum,
        },
      });

      // 5. 주문 상태 업데이트
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: '결제 완료',
        },
      });

      return {
        user: updatedUser,
        partner: updatedPartner,
        order: updatedOrder,
      };
    });

    return res.status(200).json({
      message: '결제가 성공적으로 처리되었습니다.',
      data: result,
    });
  } catch (error) {
    console.error('결제 처리 중 오류:', error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});
