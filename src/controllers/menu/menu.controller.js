import express from 'express';
import menuService from '../services/menuService';

const menuRouter = express.Router();

// 메뉴 등록 (사장님용)
menuRouter.post('/partners/menu', async (req, res) => {
  const { name, price, spicyLevel, restaurantId } = req.body;
  try {
    const menu = await menuService.createMenu({ name, price, spicyLevel, restaurantId });
    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).send('메뉴 등록 중 오류가 발생했습니다.');
  }
});

// 메뉴 목록 (소비자용)
menuRouter.get('/users/restaurants/:restaurantId/menu', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menus = await menuService.getMenusForUser(restaurantId);
    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).send('메뉴를 불러오는 중 오류가 발생했습니다.');
  }
});

// 메뉴 목록 (사장님용)
menuRouter.get('/partners/restaurants/:restaurantId/menu', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menus = await menuService.getMenusForPartner(restaurantId);
    res.status(201).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).send('메뉴를 불러오는 중 오류가 발생했습니다.');
  }
});

// 메뉴 수정 (사장님용)
menuRouter.patch('/partners/menu/:menuId', async (req, res) => {
  const { menuId } = req.params;
  const { name, price, spicyLevel } = req.body;
  try {
    const updatedMenu = await menuService.updateMenu(menuId, { name, price, spicyLevel });
    res.status(201).json(updatedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).send('메뉴 수정 중 오류가 발생했습니다.');
  }
});

// 메뉴 삭제 (사장님용)
menuRouter.delete('/partners/menu/:menuId', async (req, res) => {
  const { menuId } = req.params;
  try {
    await menuService.deleteMenu(menuId);
    res.status(200).send(`메뉴 ${menuId}가 삭제되었습니다.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('메뉴 삭제 중 오류가 발생했습니다.');
  }
});

export default menuRouter;
