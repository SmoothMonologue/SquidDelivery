import { jest } from '@jest/globals'
import { Menuservice } from './menu.service.js';

describe('MenuService test', () => {
    let mockRepository;
    let menuService;

    const mockMenu = {
        id: 1,
        name: '떡볶이',
        price: 5000,
        spicyLevel: 1,
        restaurantId: 1
    };

    beforeEach(() => {
        mockRepository = {
            createMenu: jest.fn(),
            restaurantIdMenu: jest.fn(),
            updateMenu: jest.fn(),
            deleteMenu: jest.fn()
        };
        menuService = new Menuservice(mockRepository);
    });

    describe('createMenu', () => {
        it('메뉴 생성 성공', async () => {
            const menuData = {
                name: '떡볶이',
                price: 5000,
                spicyLevel: 1,
                restaurantId: 1
            };

            mockRepository.createMenu.mockResolvedValue(mockMenu);

            const result = await menuService.createMenu(menuData);

            expect(mockRepository.createMenu).toHaveBeenCalledWith({
                name: '떡볶이',
                price: 5000,
                spicyLevel: 1,
                restaurantId: 1
            });
            expect(result).toEqual(mockMenu);
        });

        it('필수 필드 누락시 메뉴 생성 실패', async () => {
            const invalidData = {
                price: 5000,
                spicyLevel: 1
            };

            await expect(async () => {
                await menuService.createMenu(invalidData);
            }).rejects.toThrow('메뉴 이름, 가격, 레스토랑 ID는 필수입니다.');
        });
    });

    describe('restaurantIdMenu', () => {
        it('레스토랑 메뉴 목록 조회 성공', async () => {
            const mockMenus = [mockMenu];
            mockRepository.restaurantIdMenu.mockResolvedValue(mockMenus);

            const result = await menuService.restaurantIdMenu({ restaurantId: 1 });

            expect(mockRepository.restaurantIdMenu).toHaveBeenCalledWith({
                restaurantId: 1
            });
            expect(result).toEqual(mockMenus);
        });
    });

    describe('updateMenu', () => {
        it('메뉴 수정 성공', async () => {
            const updateData = {
                menuId: 1,
                data: { name: '매운 떡볶이', price: 6000 }
            };
            const updatedMenu = { ...mockMenu, ...updateData.data };
            mockRepository.updateMenu.mockResolvedValue(updatedMenu);

            const result = await menuService.updateMenu(updateData);

            expect(mockRepository.updateMenu).toHaveBeenCalledWith({
                menuId: 1,
                data: updateData.data
            });
            expect(result).toEqual(updatedMenu);
        });
    });

    describe('deleteMenu', () => {
        it('메뉴 삭제 성공', async () => {
            mockRepository.deleteMenu.mockResolvedValue(mockMenu);

            const result = await menuService.deleteMenu({ menuId: 1 });

            expect(mockRepository.deleteMenu).toHaveBeenCalledWith({
                menuId: 1
            });
            expect(result).toEqual(mockMenu);
        });
    });
});