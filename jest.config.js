export default {
    transform: {},
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    testEnvironment: 'node',
    // 모든 테스트 파일을 찾을 수 있도록 패턴 설정
    testMatch: [
        "**/src/**/*.test.js"
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