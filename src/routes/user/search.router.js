import express from 'express';
import { PrismaClient } from '../../utils/prisma/index.js';

const app = express();
const prisma = new PrismaClient();

// 키워드 기반 레스토랑 검색 API
app.get('/', async (req, res) => {
  const { keyword } = req.query;

  //키워드 데이터 검증
  // trim을 이용해 String 데이터에서 공백을 없앤다
  if (!keyword || keyword.trim() === '') {
    return res.status(400).json({ message: '키워드를 입력해주세요.' });
  }

  try {
    // 레스토랑, 메뉴의 키워드와 검색 키워드가 부분 일치하는 레스토랑 조회
    const searchedRestaurants = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            keyword: {
              contains: keyword, // 키워드 부분 일치하는 데이터 조회
              mode: 'insensitive', // 대소문자 구분 없음
            },
          },
          {
            Menu: {
              // 메뉴 테이블에서
              some: {
                // 하나의 레스토랑의 메뉴 중에서 하나라도 일치하면 참 일 때마다 레스토랑테이블 레코드 조회
                name: {
                  // 메뉴이름 데이터
                  contains: keyword, //키워드 부분 일부 일치하는 데이터 조회
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      distinct: ['id'], // 중복제거 -> 하나의 레스토랑에서 여러 메뉴가 키워드 일치할 수 있기 때문에 검색결과에서 같은 레스토랑이 보일 수 있다.
    });

    // 조회 결과가 없을 경우
    if (searchedRestaurants.length === 0) {
      return res.status(404).json({ message: '검색 결과가 없습니다.' });
    }

    // 클라이언트를 위한 조회 결과 재배치
    const data = searchedRestaurants.map((restaurant) => ({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }));

    // 응답
    res.status(200).json({
      message: '검색 결과',
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '서버 오류' });
    next();
  }
});
