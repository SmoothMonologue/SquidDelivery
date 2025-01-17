# ~~펫 매칭~~ 배달의 민족 만들기

### 이거 진짜에요?

### 그럼요ㅋㅋㅋ

#### 추가된 사항

##### scripts 에 "format": "prettier --write '\*_/_.js'" 추가

##### 폴더 기본구조 생성?

##### 에러 및 메시지등 고유 상수값은 constants 폴더 안에 파일에 추가 하여 사용하기

##### 예시 > 주문 성공 메시지 추가시 constants/message.constant.js 파일에 객체를 추가하기

### 디렉토리 구조

```
SquidDelivery
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ dev
│  │     │  ├─ feature
│  │     │  │  └─ menu-page-yje
│  │     │  └─ main
│  │     ├─ remotes
│  │     │  └─ origin
│  │     │     ├─ dev
│  │     │     ├─ feat-test
│  │     │     ├─ featuer
│  │     │     │  └─ kny
│  │     │     │     └─ restaurnts
│  │     │     ├─ feature
│  │     │     │  ├─ cart-page-khj
│  │     │     │  ├─ comment-page-ohs
│  │     │     │  ├─ kny
│  │     │     │  │  ├─ restaurnt2
│  │     │     │  │  └─ webSocket
│  │     │     │  ├─ menu-page-yje
│  │     │     │  ├─ order-status-lgm
│  │     │     │  ├─ reivew-page-ohs
│  │     │     │  ├─ search-page-pys
│  │     │     │  ├─ search-page-pys2
│  │     │     │  ├─ sign-up-yhg
│  │     │     │  ├─ sign-up-yhg2
│  │     │     │  └─ test-lgm
│  │     │     ├─ HEAD
│  │     │     ├─ main
│  │     │     └─ websocket-ohs
│  │     └─ stash
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ dev
│     │  ├─ feature
│     │  │  └─ menu-page-yje
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ dev
│     │     ├─ feat-test
│     │     ├─ featuer
│     │     │  └─ kny
│     │     │     └─ restaurnts
│     │     ├─ feature
│     │     │  ├─ cart-page-khj
│     │     │  ├─ comment-page-ohs
│     │     │  ├─ kny
│     │     │  │  ├─ restaurnt2
│     │     │  │  └─ webSocket
│     │     │  ├─ menu-page-yje
│     │     │  ├─ order-status-lgm
│     │     │  ├─ reivew-page-ohs
│     │     │  ├─ search-page-pys
│     │     │  ├─ search-page-pys2
│     │     │  ├─ sign-up-yhg
│     │     │  ├─ sign-up-yhg2
│     │     │  └─ test-lgm
│     │     ├─ HEAD
│     │     ├─ main
│     │     └─ websocket-ohs
│     ├─ stash
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ coverage
│  ├─ clover.xml
│  ├─ coverage-final.json
│  ├─ lcov-report
│  │  ├─ base.css
│  │  ├─ block-navigation.js
│  │  ├─ constants
│  │  │  ├─ auth.constant.js.html
│  │  │  ├─ http-status.constant.js.html
│  │  │  ├─ index.html
│  │  │  └─ message.constant.js.html
│  │  ├─ favicon.png
│  │  ├─ index.html
│  │  ├─ prettify.css
│  │  ├─ prettify.js
│  │  ├─ services
│  │  │  ├─ partner
│  │  │  │  ├─ comment.service.js.html
│  │  │  │  ├─ index.html
│  │  │  │  ├─ menu.service.js.html
│  │  │  │  ├─ orders.service.js.html
│  │  │  │  └─ partner.restaurants.service.js.html
│  │  │  └─ user
│  │  │     ├─ cart.service.js.html
│  │  │     ├─ index.html
│  │  │     ├─ orders.services.js.html
│  │  │     ├─ review.service.js.html
│  │  │     └─ user.restaurants.service.js.html
│  │  ├─ sort-arrow-sprite.png
│  │  └─ sorter.js
│  └─ lcov.info
├─ jest.config.js
├─ key.pem
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20250108103708_init
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ cart.html
│  ├─ images
│  │  ├─ cook_squid.png
│  │  ├─ cry_squid.png
│  │  ├─ delivery_complete.png
│  │  └─ delivery_squid.png
│  ├─ index.html
│  ├─ login.html
│  ├─ menu.html
│  ├─ menuRegister.html
│  ├─ orderHistory.html
│  ├─ partner.html
│  ├─ partner.menu.update.html
│  ├─ partnerMain.html
│  ├─ partnerSignup.html
│  ├─ payment.html
│  ├─ restaurantDetails.html
│  ├─ restaurantList.html
│  ├─ restaurantRegister.html
│  ├─ review.html
│  ├─ salesStats.html
│  ├─ search.html
│  ├─ user.html
│  ├─ userMain.html
│  └─ userSignup.html
├─ readme.md
└─ src
   ├─ app.js
   ├─ comment.tests
   │  └─ jest.config.js
   ├─ constants
   │  ├─ auth.constant.js
   │  ├─ env.constant.js
   │  ├─ http-status.constant.js
   │  └─ message.constant.js
   ├─ controllers
   │  ├─ auth.controller.js
   │  ├─ partner
   │  │  ├─ comments.controller.js
   │  │  ├─ menu.controller.js
   │  │  ├─ orders.controller.js
   │  │  ├─ partner.restaurants.controller.js
   │  │  └─ partnerInfo.controller.js
   │  ├─ ranking.controller.js
   │  └─ user
   │     ├─ cart.controller.js
   │     ├─ menu.controller.js
   │     ├─ orders.controller.js
   │     ├─ profile.controller.js
   │     ├─ reviews.controller.js
   │     └─ user.restaurants.controller.js
   ├─ middlewares
   │  ├─ auth.middleware.js
   │  ├─ error-handler.middleware.js
   │  ├─ restaurant-auth.middleware.js
   │  └─ validators
   │     ├─ sign-in-validator.middleware.js
   │     └─ sign-up-validator.middleware.js
   ├─ repositories
   │  ├─ menu
   │  ├─ partner
   │  │  ├─ comment.repository.js
   │  │  ├─ menu.repository.js
   │  │  ├─ orders.repository.js
   │  │  ├─ partner.repository.js
   │  │  ├─ partner.restaurants.repository.js
   │  │  └─ partnerInfo.repository.js
   │  ├─ ranking.repository.js
   │  └─ user
   │     ├─ cart.repository.js
   │     ├─ menu.repository.js
   │     ├─ orders.repository.js
   │     ├─ profile.repository.js
   │     ├─ review.repository.js
   │     ├─ review.repository.test.js
   │     ├─ user.repository.js
   │     └─ user.restaurants.repository.js
   ├─ routes
   │  ├─ auth.router.js
   │  ├─ index.js
   │  ├─ partner
   │  │  ├─ comment.router.js
   │  │  ├─ menu.router.js
   │  │  ├─ orders.router.js
   │  │  ├─ partner.restaurants.router.js
   │  │  └─ partnerInfo.router.js
   │  ├─ partner.router.js
   │  ├─ ranking.router.js
   │  ├─ user
   │  │  ├─ cart.router.js
   │  │  ├─ orders.router.js
   │  │  ├─ profile.router.js
   │  │  ├─ review.router.js
   │  │  └─ user.restaurants.router.js
   │  └─ user.router.js
   ├─ services
   │  ├─ auth.service.js
   │  ├─ partner
   │  │  ├─ comment.service.js
   │  │  ├─ comment.service.test.js
   │  │  ├─ menu.service.js
   │  │  ├─ menu.service.test.js
   │  │  ├─ orders.service.js
   │  │  ├─ orders.service.test.js
   │  │  ├─ partner.restaurants.service.js
   │  │  ├─ partner.restaurants.test.js
   │  │  └─ partnerInfo.service.js
   │  ├─ ranking.service.js
   │  └─ user
   │     ├─ cart.service.js
   │     ├─ cart.service.test.js
   │     ├─ menu.service.js
   │     ├─ orders.service.test.js
   │     ├─ orders.services.js
   │     ├─ profile.service.js
   │     ├─ review.service.js
   │     ├─ review.services.test.js
   │     ├─ user.restaurants.service.js
   │     └─ user.restaurants.service.test.js
   └─ utils
      └─ prisma
         └─ index.js
```

## 필수 기능 개발 체크리스트

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

## 도전 기능 개발 체크리스트

- [x] 손님이 주문할 경우 사장님에게 알림
- [x] 음식이 배달되었을 경우 손님에게 알림
- [x] 음식점 랭킹
- [x] HTTPS
