# Squid Delivery

---

## 1. 프로젝트 구성

저희 프로젝트는 '배달앱 구현 프로젝트'로, 저희는 REST API와 웹소켓을 활용하여 배달서비스를 제공하는 어플리케이션을 개발하였습니다.

## 2. 프로젝트 프로그램 설치 방법 및 사용 툴

$ npm install

$ npm run dev

$ npm i -D nodemon

$ npm i socket.io

$ npm i express

### 사용툴

- Visual Studio Code
- Git
- Github
- insomnia
- winScp
- putty
- aws/acm(ssl인증서발급)/ec2/로드밸런서/router53

### 팀 규칙

##### scripts 에 "format": "prettier --write '\*_/_.js'" 추가

##### 폴더 기본구조 생성

##### 에러 및 메시지등 고유 상수값은 constants 폴더 안에 파일에 추가 하여 사용하기

##### 예시 > 주문 성공 메시지 추가시 constants/message.constant.js 파일에 객체를 추가하기

## 3. 노션 링크

[노션](https://www.notion.so/teamsparta/16e2dc3ef51480a8bbaccaac600b75ea)

## 4. 프로그래머 정보

[@김호진](https://github.com/SmoothMonologue?tab=repositories) [@강나연](https://github.com/nayeon0206) [@유재은](https://github.com/jaeeun0238) [@오혜성](https://github.com/ohhyeseong) [@박양선](https://github.com/didtjs123?tab=repositories) [@이경민](https://github.com/lgm-7) [@윤형근](https://github.com/heung-geun)

## 5. 와이어 프레임

![와이어프레임](https://www.figma.com/design/ocDWQMgMObjbKby8aGXzV1/Untitled?node-id=0-1&p=f&t=cVUHZkeYrJpo4GNx-0)

## ERD DIAGRAM

![ERD DIAGRAM](https://drawsql.app/teams/-2551/diagrams/-3)

## 6. 디텍토리 구조

```plaintext
SquidDelivery
├─ .git
├─ .gitignore
├─ .prettierrc
├─ .vscode
│   └─ settings.json
├─ coverage
│   ├─ clover.xml
│   ├─ coverage-final.json
│   ├─ lcov-report
│   │   ├─ base.css
│   │   ├─ block-navigation.js
│   │   ├─ constants
│   │   │   ├─ auth.constant.js.html
│   │   │   ├─ http-status.constant.js.html
│   │   │   ├─ index.html
│   │   │   └─ message.constant.js.html
│   │   ├─ favicon.png
│   │   ├─ index.html
│   │   ├─ prettify.css
│   │   ├─ prettify.js
│   │   ├─ services
│   │   │   ├─ partner
│   │   │   │   ├─ comment.service.js.html
│   │   │   │   ├─ index.html
│   │   │   │   ├─ menu.service.js.html
│   │   │   │   ├─ orders.service.js.html
│   │   │   │   └─ partner.restaurants.service.js.html
│   │   │   └─ user
│   │   │       ├─ cart.service.js.html
│   │   │       ├─ index.html
│   │   │       ├─ orders.services.js.html
│   │   │       ├─ review.service.js.html
│   │   │       └─ user.restaurants.service.js.html
│   │   ├─ sort-arrow-sprite.png
│   │   └─ sorter.js
│   └─ lcov.info
├─ jest.config.js
├─ key.pem
├─ package-lock.json
├─ package.json
├─ prisma
│   ├─ migrations
│   │   ├─ 20250108103708_init
│   │   │   └─ migration.sql
│   │   └─ migration_lock.toml
│   └─ schema.prisma
├─ public
│   ├─ cart.html
│   ├─ images
│   │   ├─ cook_squid.png
│   │   ├─ cry_squid.png
│   │   ├─ delivery_complete.png
│   │   └─ delivery_squid.png
│   ├─ index.html
│   ├─ login.html
│   ├─ menu.html
│   ├─ menuRegister.html
│   ├─ orderHistory.html
│   ├─ partner.html
│   ├─ partner.menu.update.html
│   ├─ partnerMain.html
│   ├─ partnerSignup.html
│   ├─ payment.html
│   ├─ restaurantDetails.html
│   ├─ restaurantList.html
│   ├─ restaurantRegister.html
│   ├─ review.html
│   ├─ salesStats.html
│   ├─ search.html
│   ├─ user.html
│   ├─ userMain.html
│   └─ userSignup.html
├─ readme.md
└─ src
    ├─ app.js
    ├─ comment.tests
    │   └─ jest.config.js
    ├─ constants
    │   ├─ auth.constant.js
    │   ├─ env.constant.js
    │   ├─ http-status.constant.js
    │   └─ message.constant.js
    ├─ controllers
    │   ├─ auth.controller.js
    │   ├─ partner
    │   │   ├─ comments.controller.js
    │   │   ├─ menu.controller.js
    │   │   ├─ orders.controller.js
    │   │   ├─ partner.restaurants.controller.js
    │   │   └─ partnerInfo.controller.js
    │   ├─ ranking.controller.js
    │   └─ user
    │       ├─ cart.controller.js
    │       ├─ menu.controller.js
    │       ├─ orders.controller.js
    │       ├─ profile.controller.js
    │       ├─ reviews.controller.js
    │       └─ user.restaurants.controller.js
    ├─ middlewares
    │   ├─ auth.middleware.js
    │   ├─ error-handler.middleware.js
    │   ├─ restaurant-auth.middleware.js
    │   └─ validators
    │       ├─ sign-in-validator.middleware.js
    │       └─ sign-up-validator.middleware.js
    ├─ repositories
    │   ├─ menu
    │   ├─ partner
    │   │   ├─ comment.repository.js
    │   │   ├─ menu.repository.js
    │   │   ├─ orders.repository.js
    │   │   ├─ partner.repository.js
    │   │   ├─ partner.restaurants.repository.js
    │   │   └─ partnerInfo.repository.js
    │   ├─ ranking.repository.js
    │   └─ user
    │       ├─ cart.repository.js
    │       ├─ menu.repository.js
    │       ├─ orders.repository.js
    │       ├─ profile.repository.js
    │       ├─ review.repository.js
    │       ├─ review.repository.test.js
    │       ├─ user.repository.js
    │       └─ user.restaurants.repository.js
    ├─ routes
    │   ├─ auth.router.js
    │   ├─ index.js
    │   ├─ partner
    │   │   ├─ comment.router.js
    │   │   ├─ menu.router.js
    │   │   ├─ orders.router.js
    │   │   ├─ partner.restaurants.router.js
    │   │   └─ partnerInfo.router.js
    │   ├─ partner.router.js
    │   ├─ ranking.router.js
    │   ├─ user
    │   │   ├─ cart.router.js
    │   │   ├─ orders.router.js
    │   │   ├─ profile.router.js
    │   │   ├─ review.router.js
    │   │   └─ user.restaurants.router.js
    │   └─ user.router.js
    ├─ services
    │   ├─ auth.service.js
    │   ├─ partner
    │   │   ├─ comment.service.js
    │   │   ├─ comment.service.test.js
    │   │   ├─ menu.service.js
    │   │   ├─ menu.service.test.js
    │   │   ├─ orders.service.js
    │   │   ├─ orders.service.test.js
    │   │   ├─ partner.restaurants.service.js
    │   │   ├─ partner.restaurants.test.js
    │   │   └─ partnerInfo.service.js
    │   ├─ ranking.service.js
    │   └─ user
    │       ├─ cart.service.js
    │       ├─ cart.service.test.js
    │       ├─ menu.service.js
    │       ├─ orders.service.test.js
    │       ├─ orders.services.js
    │       ├─ profile.service.js
    │       ├─ review.service.js
    │       ├─ review.services.test.js
    │       ├─ user.restaurants.service.js
    │       └─ user.restaurants.service.test.js
    └─ utils
        └─ prisma
            └─ index.js
```

## 7. 기능 개발 체크리스트

### 필수 기능

- 회원가입
- [x] 회원 구분 로그인
- [ ] 메일 인증
- [x] 손님으로 가입 시 백만 포인트, 사장님으로 가입 시 만 포인트
- 사장님의 업장 CRUD
- [x] 업장 등록
- [x] 업장 수정
- [x] 업장 삭제
- [x] 사장님 당 업장 하나
- [x] 회원 구분 없이 업장 조회 가능
- 사장님의 메뉴 CRUD
- [x] 메뉴의 이름, 가격 등록
- [ ] 메뉴의 이미지 등록
- [ ] 메뉴명 중복 사용 불가
- [x] 메뉴 수정
- [x] 메뉴 삭제
- [x] 회원 구분 없이 메뉴 조회 가능
- 음식점 검색
- [x] 키워드 + 메뉴 기반
- 고객님의 메뉴 주문
- 사장님의 주문 확인
- 사장님의 배달 완료
- 고객님의 리뷰 CRUD
- [x] 리뷰 작성
- [x] 리뷰 수정
- [x] 리뷰 삭제

### 도전 기능

- [x] (웹소켓 적용)손님이 주문할 경우 사장님에게 알림
- [x] (웹소켓 적용)음식이 배달되었을 경우 손님에게 알림
- [x] 음식점 랭킹
- [x] HTTPS 적용

### 추가 기능

- 받은 리뷰에 대한 사장님의 코멘트 CRUD
- [x] 코멘트 작성
- [x] 코멘트 수정
- [x] 코멘트 삭제
