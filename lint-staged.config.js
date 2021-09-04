module.exports = {
  '*.{css,scss,wxss}': ['stylelint **/*.{css,scss,wxss} --fix'],
  '*.{ts,js,json}': ['prettier --write', 'eslint --fix', 'eslint']
};
