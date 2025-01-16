export default {
    transform: {},
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    // 테스트 파일 패턴 설정
    testMatch: [
        "**/__tests__/**/*.js",
        "**/?(*.)+(spec|test).js"
    ],
    // 테스트 환경 설정
    testEnvironment: "node",
    // 커버리지 설정
    collectCoverage: true,
    coverageDirectory: "coverage",
    // 테스트 제외 디렉토리
    testPathIgnorePatterns: [
        "/node_modules/"
    ]
}; 