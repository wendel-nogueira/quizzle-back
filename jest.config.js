module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.(ts|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
        tsConfig: 'tsconfig.json',
    },
};