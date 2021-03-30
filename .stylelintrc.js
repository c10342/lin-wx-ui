module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['lin-goods-action-button', 'page', 'lin-col', 'lin-row'],
      },
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['iconfont'] },
    ],
  },
};
