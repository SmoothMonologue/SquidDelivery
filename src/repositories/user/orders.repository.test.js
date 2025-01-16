import { jest } from '@jest/globals';
import { OrderRepository } from './orders.repository.js';

describe('OrderRepository test', () => {
    let fakePrisma;
    let orderRepository;

    const mockCart = {
        id: 1,
        userId: 1,
        restaurantId: 1,
        menuInfo: [
            { name: '떡볶이', price: 5000 }
        ],
        Restaurant: {
            Partner: {
                id: 1
            }
        }
    };

    const mockUser = {
        id: 1,
        cash: 10000
    };

    const mockOrder = {
        id: 1,
        userId: 1,
        restaurantId: 1,
        status: '주문 요청',
        priceSum: 5000
    };

    beforeEach(() => {
        fakePrisma = {
            cart: {
                findFirst: jest.fn()
            },
            user: {
                findUnique: jest.fn(),
                update: jest.fn()
            },
            partner: {
                update: jest.fn()
            },
            order: {
                create: jest.fn(),
                findFirst: jest.fn(),
                update: jest.fn()
            },
            payment: {
                create: jest.fn()
            },
            restaurant: {
                update: jest.fn()
            },
            $transaction: jest.fn(callback => callback(fakePrisma))
        };
        orderRepository = new OrderRepository(fakePrisma);
    });

    describe('findCart', () => {
        it('장바구니 조회 성공', async () => {
            fakePrisma.cart.findFirst.mockResolvedValue(mockCart);

            const result = await orderRepository.findCart(1);

            expect(fakePrisma.cart.findFirst).toHaveBeenCalledWith({
                where: { userId: 1 }
            });
            expect(result).toEqual(mockCart);
        });
    });

    describe('findUser', () => {
        it('유저 조회 성공', async () => {
            fakePrisma.user.findUnique.mockResolvedValue(mockUser);

            const result = await orderRepository.findUser(1);

            expect(fakePrisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 }
            });
            expect(result).toEqual(mockUser);
        });
    });

    describe('createTransaction', () => {
        it('주문 생성 트랜잭션 성공', async () => {
            const mockOrder = {
                id: 1,
                status: '주문 요청'
            };
            fakePrisma.order.create.mockResolvedValue(mockOrder);

            const result = await orderRepository.createTransaction(
                1, mockCart, 5000, '떡볶이', 'cash', 1
            );

            expect(fakePrisma.user.update).toHaveBeenCalled();
            expect(fakePrisma.partner.update).toHaveBeenCalled();
            expect(fakePrisma.order.create).toHaveBeenCalled();
            expect(fakePrisma.payment.create).toHaveBeenCalled();
            expect(result).toEqual(mockOrder);
        });
    });

    describe('cancelOrderTransaction', () => {
        it('주문 취소 트랜잭션 성공', async () => {
            const canceledOrder = { ...mockOrder, status: '주문 취소' };
            fakePrisma.order.update.mockResolvedValue(canceledOrder);

            const result = await orderRepository.cancelOrderTransaction(
                1, 1, 1, 5000
            );

            expect(fakePrisma.user.update).toHaveBeenCalled();
            expect(fakePrisma.partner.update).toHaveBeenCalled();
            expect(fakePrisma.restaurant.update).toHaveBeenCalled();
            expect(fakePrisma.order.update).toHaveBeenCalled();
            expect(result.status).toBe('주문 취소');
        });
    });

    describe('checkOrderStatus', () => {
        it('주문 상태 확인 성공', async () => {
            const orderStatus = { status: '주문 요청' };
            fakePrisma.order.findFirst.mockResolvedValue(orderStatus);

            const result = await orderRepository.checkOrderStatus(1);

            expect(fakePrisma.order.findFirst).toHaveBeenCalledWith({
                where: { id: 1 },
                select: { status: true }
            });
            expect(result).toEqual(orderStatus);
        });
    });
}); 