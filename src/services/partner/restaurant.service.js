import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RestaurantService {
  createRestaurant = async (partnerId, restaurantData) => {
    try {
      const { restaurantName, keyword } = restaurantData;
      
      const restaurant = await prisma.restaurant.create({
        data: {
          restaurantName,
          keyword: keyword || null,
          partnerId,
        },
      });
      return restaurant;
    } catch (error) {
      throw error;
    }
  };

  getRestaurant = async (restaurantId) => {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: {
          menus: true,
          reviews: {
            include: {
              user: true,
            },
          },
        },
      });
      return restaurant;
    } catch (error) {
      throw error;
    }
  };

  getPartnerRestaurants = async (partnerId) => {
    try {
      const restaurants = await prisma.restaurant.findMany({
        where: { partnerId },
        include: {
          menus: true,
          reviews: true,
        },
      });
      return restaurants;
    } catch (error) {
      throw error;
    }
  };

  updateRestaurant = async (restaurantId, updateData) => {
    try {
      const restaurant = await prisma.restaurant.update({
        where: { id: Number(restaurantId) },
        data: updateData,
      });
      return restaurant;
    } catch (error) {
      throw error;
    }
  };

  deleteRestaurant = async (restaurantId) => {
    try {
      await prisma.restaurant.delete({
        where: { id: Number(restaurantId) },
      });
      return { message: '레스토랑이 성공적으로 삭제되었습니다.' };
    } catch (error) {
      throw error;
    }
  };
}

export default new RestaurantService(); 