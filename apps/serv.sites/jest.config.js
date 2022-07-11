module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  collectCoverage: true,
  clearMocks: true,
  rootDir: 'src',
  coverageReporters: ['json', 'lcov'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/$1',
  },
};
