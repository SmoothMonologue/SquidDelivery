module.exports = {
    moduleFileExtensions: ['js', 'json', 'node'],
    testEnvironment: 'node',
    testMatch: ["**/src/**/*.test.js"],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-mock-extended)/)'
    ],
    setupFilesAfterEnv: ['./__mocks__/prismaMock.js']
}; 