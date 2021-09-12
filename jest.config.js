const path = require("path");

module.exports = {
  // 生成测试报告
  // collectCoverage:true,
  bail: 1,
  verbose: true,
  rootDir: path.join(__dirname),
  moduleFileExtensions: ["js"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  // jest 是直接在 nodejs 环境进行测试，使用 jsdom 进行 dom 环境的模拟。在使用时需要将 jest 的 `testEnvironment` 配置为 `jsdom`。
  // jest 内置 jsdom，所以不需要额外引入。
  testEnvironment: "jsdom",
  // 配置 jest-snapshot-plugin 从而在使用 jest 的 snapshot 功能时获得更加适合肉眼阅读的结构
  snapshotSerializers: ["miniprogram-simulate/jest-snapshot-plugin"],
  collectCoverageFrom: [
    // '<rootDir>/packages/**/*.js',
    // '!<rootDir>/packages/common/**',
    // '!<rootDir>/packages/behaviors/**',
    // '!<rootDir>/packages/wxs/**'
    "<rootDir>/packages/Button/**/*.js"
  ]
};
