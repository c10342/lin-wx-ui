module.exports = {
  '*.{css,scss,wxss}': ['stylelint **/*.{css,scss} --fix'],
  '*.{ts,js,json}': ['prettier --write', 'eslint --fix', 'git add', 'eslint']
};
