const LinkBehavior = Behavior({
  properties: {
    // 链接跳转类型
    linkType: {
      type: String,
      value: 'navigateTo',
      options: ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']
    }
  },
  methods: {
    // 跳转页面
    jump (url) {
      if (url) {
        const { linkType } = this.properties;
        wx[linkType]({ url });
      }
    }
  }
});
export default LinkBehavior;
