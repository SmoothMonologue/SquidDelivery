import { jest } from '@jest/globals';
import { CartRepository } from './cart.repository.js';

describe('CartRepository test', () => {
    let fakePrisma;
    let cartRepository;

    const mockCart = {
        id: 1,
        userId: 1,
        restaurantId: 1,
        menuInfo: [
            { id: 1, name: '떡볶이', price: 5000 },
            { id: 2, name: '순대', price: 4000 }
        ]
    };

    const mockMenu = {
        id: 3,
        name: '튀김',
        price: 3000
    };

    beforeEach(() => {
        fakePrisma = {
            cart: {
                create: jest.fn(),
                findUnique: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            },
            menu: {
                findUnique: jest.fn()
            },
            menuCart: {
                create: jest.fn()
            }
        };
        cartRepository = new CartRepository(fakePrisma);
    });

    describe('createCart', () => {
        it('장바구니 생성 성공', async () => {
            const cartData = {
                userId: 1,
                restaurantId: 1
            };
            fakePrisma.cart.create.mockResolvedValue(mockCart);

            const result = await cartRepository.createCart(cartData);

            expect(fakePrisma.cart.create).toHaveBeenCalledWith({
                data: {
                    userId: 1,
                    restaurantId: 1,
                    menuInfo: []
                }
            });
            expect(result).toEqual(mockCart);
        });
    });

    describe('usingCart', () => {
        it('선택한 장바구니 조회 성공', async () => {
            fakePrisma.cart.findUnique.mockResolvedValue(mockCart);

            const result = await cartRepository.usingCart(1);

            expect(fakePrisma.cart.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockCart);
        });
    });

    describe('usingCarts', () => {
        it('사용자의 장바구니들 조회 성공', async () => {
            const mockCarts = [mockCart];
            fakePrisma.cart.findMany.mockResolvedValue(mockCarts);

            const result = await cartRepository.usingCarts(1);

            expect(fakePrisma.cart.findMany).toHaveBeenCalledWith({
                where: { userId: 1 }
            });
            expect(result).toEqual(mockCarts);
        });
    });

    describe('chosenMenu', () => {
        it('메뉴 정보 조회 성공', async () => {
            fakePrisma.menu.findUnique.mockResolvedValue(mockMenu);

            const result = await cartRepository.chosenMenu(3);

            expect(fakePrisma.menu.findUnique).toHaveBeenCalledWith({
                where: { id: 3 },
                select: {
                    name: true,
                    price: true
                }
            });
            expect(result).toEqual(mockMenu);
        });
    });

    describe('addMenu', () => {
        it('장바구니에 메뉴 추가 성공', async () => {
            const updatedCart = {
                ...mockCart,
                menuInfo: [...mockCart.menuInfo, mockMenu]
            };
            fakePrisma.cart.update.mockResolvedValue(updatedCart);

            const result = await cartRepository.addMenu({
                cartId: 1,
                infoOfChosenMenu: updatedCart.menuInfo
            });

            expect(fakePrisma.cart.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { menuInfo: updatedCart.menuInfo }
            });
            expect(result).toEqual(updatedCart);
        });
    });

    describe('newMenuOfCart', () => {
        it('새로운 메뉴-장바구니 관계 생성 성공', async () => {
            const menuCartData = {
                cartId: 1,
                menuId: 3
            };
            fakePrisma.menuCart.create.mockResolvedValue({
                id: 1,
                ...menuCartData
            });

            const result = await cartRepository.newMenuOfCart(menuCartData);

            expect(fakePrisma.menuCart.create).toHaveBeenCalledWith({
                data: {
                    cartId: 1,
                    menuId: 3
                }
            });
            expect(result).toHaveProperty('cartId', menuCartData.cartId);
        });
    });

    describe('deleteCart', () => {
        it('장바구니 삭제 성공', async () => {
            fakePrisma.cart.delete.mockResolvedValue(mockCart);

            const result = await cartRepository.deleteCart(1);

            expect(fakePrisma.cart.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockCart);
        });
    });
});