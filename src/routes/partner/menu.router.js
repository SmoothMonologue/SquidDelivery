import { Prisma } from '@prisma/client';
import express from 'express';

const menuRouter = express.Router();

// 메뉴 등록(사장님용)
menuRouter.post('/partners/menu', async (req, res) => {
  // 등록 로직 작성
  const { name, price, spicyLevel, restaurantId } = req.body;
  if (!name && !price && !restaurantId) {
    return res.status(400).send('값이 전부다 입력되지 않았습니다.');
  }
  try {
    // Prisma를 사용하여 'menu' 테이블에 새로운 메뉴를 생성합니다.
    const menu = await prisma.menu.create({
      data: {
        name, // 메뉴 이름
        price, // 가격
        spicyLevel, // 매운맛 레벨 (옵션)
        restaurantId, // 레스토랑 ID (필수)
      },
    });

    // 생성된 메뉴 데이터를 클라이언트에 반환합니다.
    res.status(201).json(menu);
  } catch (error) {
    // 데이터베이스 작업 중 오류가 발생하면 에러를 로그로 출력하고, 클라이언트에 에러 메시지를 반환합니다.
    console.error(error);
    res.status(401).send('메뉴 등록 중 오류가 발생했습니다.');
  }
});

// 메뉴 목록(소비자용)
menuRouter.get('/users/restaurants/:restauranstId/menu', async (req, res) => {
  // 소비자용 메뉴 목록 로직 작성
  const { restaurantId } = req.params;
  try {
    // 'restaurantId'에 해당하는 모든 메뉴를 데이터베이스에서 조회합니다.
    const menus = await prisma.menu.findMany({
      where: { restaurantId }, //+restaurantId
    });

    // 조회된 메뉴 목록을 JSON 형식으로 클라이언트에 반환합니다.
    res.status(201).json(menus);
  } catch (error) {
    // 데이터베이스 작업 중 오류가 발생하면 에러를 로그로 출력하고, 클라이언트에 에러 메시지를 반환합니다.
    console.error(error);
    res.status(500).send('메뉴를 불러오는 중 오류가 발생했습니다.');
  }
});

// 메뉴 목록(사장님용)
menuRouter.get('/partners/restaurants/:restaurantId/menu', async (req, res) => {
  const { restaurantId } = req.params; // URL 경로에서 'restaurantId'를 추출합니다.

  try {
    // 'restaurantId'에 해당하는 모든 메뉴를 데이터베이스에서 조회합니다.
    const menus = await prisma.menu.findMany({
      where: { restaurantId },
    });

    // 조회된 메뉴 목록을 JSON 형식으로 클라이언트에 반환합니다.
    res.status(201).json(menus);
  } catch (error) {
    // 데이터베이스 작업 중 오류가 발생하면 에러를 로그로 출력하고, 클라이언트에 에러 메시지를 반환합니다.
    console.error(error);
    res.status(500).send('메뉴를 불러오는 중 오류가 발생했습니다.');
  }
});
// 메뉴 수정(사장님용)
menuRouter.patch('/partners/menu/:menuId', async (req, res) => {
  const { menuId } = req.params; // URL 경로에서 'menuId'를 추출합니다.
  const { name, price, spicyLevel } = req.body; // 요청 본문에서 수정할 데이터를 추출합니다.
  // if문으로 메뉴나 가격이 없을때의 경우만들기
  // price가 0보다 작을때의 오류도 만들기
  try {
    // Prisma를 사용하여 'menuId'에 해당하는 메뉴 데이터를 업데이트합니다.
    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: { name, price, spicyLevel }, // 수정할 데이터를 전달합니다.
    });

    // 수정된 메뉴 데이터를 클라이언트에 반환합니다.
    res.status(201).json(updatedMenu);
  } catch (error) {
    // 데이터베이스 작업 중 오류가 발생하면 에러를 로그로 출력하고, 클라이언트에 에러 메시지를 반환합니다.
    console.error(error);
    res.status(500).send('메뉴 수정 중 오류가 발생했습니다.');
  }
});
// 메뉴 삭제(사장님용)
menuRouter.delete('/partners/menu/:menuId', async (req, res) => {
  const { menuId } = req.params; // URL 경로에서 'menuId'를 추출합니다.

  try {
    // Prisma를 사용하여 'menuId'에 해당하는 메뉴 데이터를 삭제합니다.
    await prisma.menu.delete({
      where: { id }, // 삭제 대상 메뉴의 ID를 지정합니다.
    });

    // 삭제 성공 메시지를 클라이언트에 반환합니다.
    res.status(200).send(`메뉴 ${menuId}가 삭제되었습니다.`);
  } catch (error) {
    // 데이터베이스 작업 중 오류가 발생하면 에러를 로그로 출력하고, 클라이언트에 에러 메시지를 반환합니다.
    console.error(error);
    res.status(500).send('메뉴 삭제 중 오류가 발생했습니다.');
  }
});

export default menuRouter; // 작성된 라우터를 외부에서 사용할 수 있도록 내보냅니다.
