/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '/test/.*\.(ts|tsx|js)$',
  testEnvironmentOptions: {
    url: 'https://somefaketesturl.com'
  }
};
