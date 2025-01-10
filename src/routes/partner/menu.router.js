import { Prisma } from '@prisma/client';
import express from 'express';

const menuRouter = express.Router();

// 메뉴 등록(사장님용)
menuRouter.post('/partners/menu', async(req, res) => {
    // 등록 로직 작성
    res.send('메뉴가 등록되었습니다.');
});

// 메뉴 목록(소비자용)
menuRouter.get('/users/restaurants/:restauranstId/menu', (req, res) => {
    // 소비자용 메뉴 목록 로직 작성
    res.send('소비자용 메뉴 목록입니다.');
});

// 메뉴 목록(사장님용)
menuRouter.get('/partners/restaurants/:restauranstId/menu', (req, res) => {
    // 사장님용 메뉴 목록 로직 작성
    res.send('사장님용 메뉴 목록입니다.');
});

// 메뉴 수정(사장님용)
menuRouter.put('/partners/menu/:menuId', (req, res) => {
    const menuId = req.params.menuId;
    // 수정 로직 작성
    res.send(`메뉴 ${menuId} 수정되었습니다.`);
});

// 메뉴 삭제(사장님용)
menuRouter.delete('/partners/menu/:menuId', (req, res) => {
    const menuId = req.params.menuId;
    // 삭제 로직 작성
    res.send(`메뉴 ${menuId} 삭제되었습니다.`);
});

export default menuRouter;
