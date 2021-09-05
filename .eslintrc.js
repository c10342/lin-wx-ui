module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:json/recommended"
  ],
  plugins: ["@typescript-eslint"],
  // globals: {
  //   Component: true,
  //   Behavior: true,
  //   Page: true,
  //   wx: true,
  //   App: true,
  //   getCurrentPages: true,
  //   getDate: true
  // },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-namespace": "off"
  }
};
