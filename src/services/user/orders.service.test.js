import { jest } from '@jest/globals';
import { OrderService } from './orders.service.js';
console.log( OrderService);
describe('OrderService test', () => {
    let mockRepository;
    let orderService;

    const mockCart = {
        id: 1,
        userId: 1,
        menuInfo: [
            { id: 1, name: '떡볶이', price: 5000 },
            { id: 2, name: '순대', price: 4000 }
        ]
    };

    const mockUser = {
        id: 1,
        cash: 10000
    };

    const mockPartner = {
        id: 1
    };

    const mockOrder = {
        id: 1,
        userId: 1,
        status: '주문 요청'
    };

    beforeEach(() => {
        mockRepository = {
            findCart: jest.fn(),
            findUser: jest.fn(),
            findPartner: jest.fn(),
            createTransaction: jest.fn(),
            checkOrderStatus: jest.fn(),
            cancelOrderTransaction: jest.fn()
        };
        orderService = new OrderService(mockRepository);
    });

    describe('createOrder', () => {
        it('주문 생성 성공', async () => {
            mockRepository.findCart.mockResolvedValue(mockCart);
            mockRepository.findUser.mockResolvedValue(mockUser);
            mockRepository.findPartner.mockResolvedValue(mockPartner);
            mockRepository.createTransaction.mockResolvedValue(mockOrder);

            const result = await orderService.createOrder(1, 'cash');

            expect(result.status).toBe(201);
            expect(result.message).toBe('메뉴를 주문했습니다.');
            expect(result.order).toEqual(mockOrder);
        });

        it('장바구니가 없을 경우 실패', async () => {
            mockRepository.findCart.mockResolvedValue(null);

            const result = await orderService.createOrder(1, 'cash');

            expect(result.status).toBe(404);
            expect(result.message).toBe('장바구니를 찾을 수 없습니다.');
        });

        it('잔액 부족으로 주문 실패', async () => {
            mockRepository.findCart.mockResolvedValue(mockCart);
            mockRepository.findUser.mockResolvedValue({ ...mockUser, cash: 1000 });

            const result = await orderService.createOrder(1, 'cash');

            expect(result.status).toBe(400);
            expect(result.message).toBe('잔액이 부족합니다.');
        });
    });

    describe('cancelOrder', () => {
        it('주문 취소 성공', async () => {
            mockRepository.checkOrderStatus.mockResolvedValue({ status: '주문 요청' });
            mockRepository.findCart.mockResolvedValue(mockCart);
            mockRepository.findPartner.mockResolvedValue(mockPartner);
            mockRepository.cancelOrderTransaction.mockResolvedValue(mockOrder);

            const result = await orderService.cancelOrder(1, 1);

            expect(result.status).toBe(200);
            expect(result.message).toBe('주문이 취소되었습니다.');
            expect(result.order).toEqual(mockOrder);
        });

        it('이미 취소된 주문 취소 실패', async () => {
            mockRepository.checkOrderStatus.mockResolvedValue({ status: '주문 취소' });

            const result = await orderService.cancelOrder(1, 1);

            expect(result.status).toBe(400);
            expect(result.message).toBe('이미 주문 취소 되었습니다.');
        });

        it('조리 중인 주문 취소 실패', async () => {
            mockRepository.checkOrderStatus.mockResolvedValue({ status: '조리 중' });

            const result = await orderService.cancelOrder(1, 1);

            expect(result.status).toBe(400);
            expect(result.message).toBe('조리 중 이거나 배달상태 입니다(취소 불가)');
        });
    });
}); 