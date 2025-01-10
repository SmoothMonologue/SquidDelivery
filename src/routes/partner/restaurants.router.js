import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Prisma Client 인스턴스 생성
const restaurantsRouter = express.Router();

// Create a new restaurant (C) - 새로운 레스토랑 생성
restaurantsRouter.post('/restaurants', async (req, res) => {
    const { partnerId, restaurantName, keyword } = req.body; // 요청 본문에서 필요한 데이터 추출
    try {
        // Prisma를 사용해 새로운 레스토랑 생성
        const newRestaurant = await prisma.restaurant.create({
            data: {
                partnerId, // 파트너 ID
                restaurantName, // 레스토랑 이름
                keyword, // 키워드 (optional)
            },
        });
        res.status(201).json(newRestaurant); // 생성된 레스토랑 데이터 응답
    } catch (error) {
        res.status(500).json({ message: '레스토랑 생성 중 에러가 발생했습니다: ' + error.message }); // 에러 발생 시 에러 메시지 반환
    }
});

// Get all restaurants (R) - 모든 레스토랑 조회
restaurantsRouter.get('/restaurants', async (req, res) => {
    try {
        // Prisma를 사용해 모든 레스토랑 조회
        const restaurants = await prisma.restaurant.findMany({
            include: {
                Partner: true, // 관련된 Partner 데이터를 포함 (optional)
                Menu: true,    // 관련된 Menu 데이터를 포함 (optional)
            },
        });
        res.status(200).json(restaurants); // 조회된 레스토랑 데이터 응답
    } catch (error) {
        res.status(500).json({ message: '레스토랑 조회 중 에러가 발생했습니다: ' + error.message }); // 에러 발생 시 에러 메시지 반환
    }
});

// Get a restaurant by ID (R) - 특정 ID의 레스토랑 조회
restaurantsRouter.get('/restaurants/:restaurantsid', async (req, res) => {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: parseInt(req.params.id, 10) }, // URL 파라미터에서 ID를 정수로 변환
            include: {
                Partner: true, // 관련된 Partner 데이터를 포함 (optional)
                Menu: true,    // 관련된 Menu 데이터를 포함 (optional)
            },
        });
        if (!restaurant) {
            return res.status(404).json({ message: '레스토랑을 찾을 수 없습니다!' }); // 레스토랑이 없는 경우 404 응답
        }
        res.status(200).json(restaurant); // 조회된 레스토랑 데이터 응답
    } catch (error) {
        res.status(500).json({ message: '레스토랑 조회 중 에러가 발생했습니다: ' + error.message }); // 에러 발생 시 에러 메시지 반환
    }
});

// Update a restaurant (U) - 특정 ID의 레스토랑 데이터 수정
restaurantsRouter.put('/restaurants/:restaurantsid', async (req, res) => {
    const { restaurantName, keyword } = req.body; // 요청 본문에서 업데이트할 데이터 추출
    try {
        // Prisma를 사용해 레스토랑 데이터 업데이트
        const updatedRestaurant = await prisma.restaurant.update({
            where: { id: parseInt(req.params.id, 10) }, // URL 파라미터에서 ID를 정수로 변환
            data: {
                restaurantName, // 업데이트할 레스토랑 이름
                keyword, // 업데이트할 키워드
            },
        });
        res.status(200).json(updatedRestaurant); // 업데이트된 레스토랑 데이터 응답
    } catch (error) {
        res.status(500).json({ message: '레스토랑 업데이트 중 에러가 발생했습니다: ' + error.message }); // 에러 발생 시 에러 메시지 반환
    }
});

// Delete a restaurant (D) - 특정 ID의 레스토랑 삭제
restaurantsRouter.delete('/restaurants/:restaurantsid', async (req, res) => {
    try {
        // Prisma를 사용해 레스토랑 삭제
        await prisma.restaurant.delete({
            where: { id: parseInt(req.params.id, 10) }, // URL 파라미터에서 ID를 정수로 변환
        });
        res.status(204).send(); // 삭제 성공 시 응답 본문 없이 상태 코드 204 반환
    } catch (error) {
        res.status(500).json({ message: '레스토랑 삭제 중 에러가 발생했습니다: ' + error.message }); // 에러 발생 시 에러 메시지 반환
    }
});

export default restaurantsRouter; // 모듈을 외부에서 사용할 수 있도록 익스포트
