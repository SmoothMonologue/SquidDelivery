import { jest } from '@jest/globals';
import { Menurepository } from './menu.repository.js';

describe('MenuRepository test', () => {
    let fakePrisma;
    let menuRepository;

    const mockMenu = {
        id: 1,
        name: '떡볶이',
        price: 5000,
        spicyLevel: 1,
        restaurantId: 1
    };

    beforeEach(() => {
        fakePrisma = {
            menu: {
                create: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }
        };
        menuRepository = new Menurepository(fakePrisma);
    });

    describe('createMenu', () => {
        it('메뉴 생성 성공', async () => {
            const menuData = {
                name: '떡볶이',
                price: 5000,
                spicyLevel: 1,
                restaurantId: 1
            };
            fakePrisma.menu.create.mockResolvedValue(mockMenu);

            const result = await menuRepository.createMenu(menuData);

            expect(fakePrisma.menu.create).toHaveBeenCalledWith({
                data: {
                    name: menuData.name,
                    price: Number(menuData.price),
                    spicyLevel: Number(menuData.spicyLevel),
                    restaurantId: Number(menuData.restaurantId)
                }
            });
            expect(result).toEqual(mockMenu);
        });
    });

    describe('restaurantIdMenu', () => {
        it('레스토랑 메뉴 목록 조회 성공', async () => {
            const mockMenus = [mockMenu];
            fakePrisma.menu.findMany.mockResolvedValue(mockMenus);

            const result = await menuRepository.restaurantIdMenu({ restaurantId: 1 });

            expect(fakePrisma.menu.findMany).toHaveBeenCalledWith({
                where: {
                    restaurantId: { equals: 1 }
                }
            });
            expect(result).toEqual(mockMenus);
        });
    });

    describe('updateMenu', () => {
        it('메뉴 수정 성공', async () => {
            const updateData = {
                menuId: 1,
                data: {
                    name: '매운 떡볶이',
                    price: 6000,
                    spicyLevel: 2,
                    restaurantId: 1
                }
            };
            const updatedMenu = { ...mockMenu, ...updateData.data };
            fakePrisma.menu.update.mockResolvedValue(updatedMenu);

            const result = await menuRepository.updateMenu(updateData);

            expect(fakePrisma.menu.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: {
                    name: updateData.data.name,
                    price: Number(updateData.data.price),
                    spicyLevel: Number(updateData.data.spicyLevel),
                    restaurantId: Number(updateData.data.restaurantId)
                }
            });
            expect(result).toEqual(updatedMenu);
        });
    });

    describe('deleteMenu', () => {
        it('메뉴 삭제 성공', async () => {
            fakePrisma.menu.delete.mockResolvedValue(mockMenu);

            const result = await menuRepository.deleteMenu({ menuId: 1 });

            expect(fakePrisma.menu.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockMenu);
        });
    });
}); 