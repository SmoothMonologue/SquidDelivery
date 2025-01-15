import { prisma } from '../utils/prisma/index.js';

const getRankedSales = async () => {
  try {
    const salesData = await prisma.restaurant.findMany({
      orderBy: {
        sales: 'desc',
      },
      take: 5, // 최대 5개 항목만 가져오기
    });

    salesData.forEach((restaurant, index) => {
      restaurant
        .status(200)
        .json({ message: `${index + 1}위: ${restaurant.name} (매출액: ${restaurant.sales})` });
    });
  } catch (error) {
    return {
      status: 500,
      message: '랭킹 조회에 실패했습니다.',
    };
  }
};

console.log(getRankedSales);
