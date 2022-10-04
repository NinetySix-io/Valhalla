module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testRegex: '/src/.*\\.(test|spec).ts$',
  collectCoverageFrom: [
    'src/**/*.{ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  collectCoverage: true,
  clearMocks: true,
  rootDir: 'src',
  coverageReporters: ['json', 'lcov'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
};
