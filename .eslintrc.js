module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    Component: true,
    Behavior: true,
    // Page: true,
    wx: true,
    // App: true,
    getCurrentPages: true,
    getDate: true
  },
  rules: {
    'linebreak-style': ['off', 'windows'],
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'no-console': ['error', { allow: ['warn'] }],
    semi: ['error', 'always'],
    'node/no-callback-literal': 'off'
  }
};
