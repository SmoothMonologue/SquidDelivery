import { jest } from '@jest/globals';
import { OrderRepository } from './orders.repository.js';

describe('OrderRepository', () => {
  let mockPrisma;
  let orderRepository;

  beforeEach(() => {
    mockPrisma = {
      restaurant: {
        findFirst: jest.fn(),
      },
      order: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      cart: {
        findFirst: jest.fn(),
      },
      user: {
        update: jest.fn(),
      },
      partner: {
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };
    orderRepository = new OrderRepository(mockPrisma);
  });

  test('findFirstRestaurant', async () => {
    const mockPartner = { id: 1 };
    const mockRestaurant = { id: 1, partnerId: 1 };
    
    mockPrisma.restaurant.findFirst.mockResolvedValue(mockRestaurant);
    
    const result = await orderRepository.findFirstRestaurant(mockPartner);
    
    expect(mockPrisma.restaurant.findFirst).toHaveBeenCalledWith({
      where: { partnerId: mockPartner.id },
    });
    expect(result).toEqual(mockRestaurant);
  });

  test('findManyOrder', async () => {
    const mockRestaurant = { id: 1 };
    const mockOrders = [
      { id: 1, userId: 1, status: '주문 완료', priceSum: 10000 },
    ];
    
    mockPrisma.order.findMany.mockResolvedValue(mockOrders);
    
    const result = await orderRepository.findManyOrder(mockRestaurant);
    
    expect(mockPrisma.order.findMany).toHaveBeenCalledWith({
      where: { restaurantId: mockRestaurant.id },
      select: {
        id: true,
        userId: true,
        status: true,
        priceSum: true,
        menuName: true,
        createdAt: true,
      },
    });
    expect(result).toEqual(mockOrders);
  });

  test('updateOrder', async () => {
    const orderId = 1;
    const mockRestaurant = { id: 1 };
    const mockUpdatedOrder = {
      id: orderId,
      status: '음식 조리 중',
    };

    mockPrisma.order.update.mockResolvedValue(mockUpdatedOrder);

    const result = await orderRepository.updateOrder(orderId, mockRestaurant);

    expect(mockPrisma.order.update).toHaveBeenCalledWith({
      where: {
        id: orderId,
        restaurantId: mockRestaurant.id,
      },
      data: {
        status: '음식 조리 중',
      },
    });
    expect(result).toEqual(mockUpdatedOrder);
  });
}); 