import { jest } from '@jest/globals';
import { CartService } from './cart.service.js';

describe('CartService test', () => {
    let mockRepository;
    let cartService;

    const mockCart = {
        id: 1,
        userId: 1,
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
        mockRepository = {
            createCart: jest.fn(),
            usingCart: jest.fn(),
            usingCarts: jest.fn(),
            chosenMenu: jest.fn(),
            addMenu: jest.fn(),
            newMenuOfCart: jest.fn(),
            deleteCart: jest.fn()
        };
        cartService = new CartService(mockRepository);
    });

    describe('createCart', () => {
        it('장바구니 생성 성공', async () => {
            const cartData = { userId: 1 };
            mockRepository.createCart.mockResolvedValue(mockCart);

            const result = await cartService.createCart(cartData);

            expect(mockRepository.createCart).toHaveBeenCalledWith(cartData);
            expect(result).toEqual(mockCart);
        });
    });

    describe('usingCart', () => {
        it('선택한 장바구니 조회 성공', async () => {
            mockRepository.usingCart.mockResolvedValue(mockCart);

            const result = await cartService.usingCart(1);

            expect(mockRepository.usingCart).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockCart);
        });
    });

    describe('usingCarts', () => {
        it('사용자의 장바구니들 조회 성공', async () => {
            const mockCarts = [mockCart];
            mockRepository.usingCarts.mockResolvedValue(mockCarts);

            const result = await cartService.usingCarts(1);

            expect(mockRepository.usingCarts).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockCarts);
        });
    });

    describe('addMenu', () => {
        it('장바구니에 메뉴 추가 성공', async () => {
            mockRepository.usingCart.mockResolvedValue(mockCart);
            mockRepository.chosenMenu.mockResolvedValue(mockMenu);
            const updatedCart = {
                ...mockCart,
                menuInfo: [...mockCart.menuInfo, mockMenu]
            };
            mockRepository.addMenu.mockResolvedValue(updatedCart);

            const result = await cartService.addMenu({ cartId: 1, menuId: 3 });

            expect(mockRepository.addMenu).toHaveBeenCalled();
            expect(result.menuInfo).toContainEqual(mockMenu);
        });
    });

    describe('deleteCart', () => {
        it('장바구니 삭제 성공', async () => {
            mockRepository.deleteCart.mockResolvedValue(mockCart);

            const result = await cartService.deleteCart(1);

            expect(mockRepository.deleteCart).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockCart);
        });
    });
}); 