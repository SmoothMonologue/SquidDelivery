import { jest } from '@jest/globals';
import { OrderService } from './orders.service.js';

describe('OrderService test', () => {
    let mockRepository;
    let orderService;

    const mockRestaurant = {
        id: 1,
        name: '테스트 식당',
        partnerId: 1
    };

    const mockOrder = {
        id: 1,
        restaurantId: 1,
        status: '주문 요청',
        menuName: '떡볶이',
        totalPrice: 15000
    };

    beforeEach(() => {
        mockRepository = {
            findFirstRestaurant: jest.fn(),
            findManyOrder: jest.fn(),
            findFirstOrder: jest.fn(),
            findCart: jest.fn(),
            updateOrder: jest.fn(),
            createTransaction: jest.fn()
        };
        orderService = new OrderService(mockRepository);
    });

    describe('getOrders', () => {
        it('주문 목록 조회 성공', async () => {
            const partner = { id: 1 };
            const mockOrders = [mockOrder];
            
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findManyOrder.mockResolvedValue(mockOrders);

            const result = await orderService.getOrders(partner);

            expect(result.status).toBe(200);
            expect(result.message).toBe('주문 조회에 성공했습니다.');
            expect(result.orders).toEqual(mockOrders);
        });

        it('음식점이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(null);

            const result = await orderService.getOrders(partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('음식점이 존재하지 않습니다.');
        });

        it('예외 발생 시 에러 응답 반환', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockRejectedValue(new Error('DB 에러'));

            const result = await orderService.getOrders(partner);

            expect(result.status).toBe(500);
            expect(result.message).toBe('주문 조회에 실패했습니다.');
        });
    });

    describe('selectGetOrder', () => {
        it('특정 주문 조회 성공', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findFirstOrder.mockResolvedValue(mockOrder);

            const result = await orderService.selectGetOrder(1, partner);

            expect(result.status).toBe(200);
            expect(result.message).toBe('주문 선택 조회 성공');
            expect(result.order).toEqual(mockOrder);
        });

        it('음식점이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(null);

            const result = await orderService.selectGetOrder(1, partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('음식점이 존재하지 않습니다.');
        });

        it('주문이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findFirstOrder.mockResolvedValue(null);

            const result = await orderService.selectGetOrder(999, partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('주문을 찾을 수 없습니다.');
        });
    });

    describe('updateOrder', () => {
        it('주문 상태 업데이트 성공', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findFirstOrder.mockResolvedValue(mockOrder);
            mockRepository.updateOrder.mockResolvedValue({
                ...mockOrder,
                status: '조리 중'
            });

            const result = await orderService.updateOrder(1, partner);

            expect(result.status).toBe(200);
            expect(result.message).toBe('주문이 접수되었습니다.');
            expect(result.data.status).toBe('조리 중');
        });

        it('음식점이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(null);

            const result = await orderService.updateOrder(1, partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('음식점이 존재하지 않습니다.');
        });
    });

    describe('cancelOrder', () => {
        it('주문 취소 성공', async () => {

            const partner = { id: 1 };
            const mockCart = { menuInfo: [{ menuName: '떡볶이', price: 15000 }] };
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findFirstOrder.mockResolvedValue(mockOrder);
            mockRepository.findCart.mockResolvedValue(mockCart);
            mockRepository.createTransaction.mockResolvedValue({
                ...mockOrder,
                status: '주문 취소'
            });

            const result = await orderService.cancelOrder(1, partner);

            expect(result.status).toBe(200);
            expect(result.message).toBe('주문이 취소되었습니다.');
            expect(result.order.status).toBe('주문 취소');
        });

        it('음식점이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            mockRepository.findFirstRestaurant.mockResolvedValue(null);

            const result = await orderService.cancelOrder(1, partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('음식점이 존재하지 않습니다.');
        });

        it('주문이 존재하지 않을 경우 실패', async () => {
            const partner = { id: 1 };
            const mockCart = { menuInfo: [{  price: 15000 }] };
            const mockOrder = { id: 999, restaurantId: 1, status: '주문 요청', menuName: '떡볶이', totalPrice: 15000 };
            mockRepository.findFirstRestaurant.mockResolvedValue(mockRestaurant);
            mockRepository.findFirstOrder.mockResolvedValue(mockOrder);
            mockRepository.findCart.mockResolvedValue(mockCart);
            // mockRepository.createTransaction.mockResolvedValue(null);

            const result = await orderService.cancelOrder(999, partner);

            expect(result.status).toBe(404);
            expect(result.message).toBe('주문을 찾을 수 없습니다.');
        });
    });
});
