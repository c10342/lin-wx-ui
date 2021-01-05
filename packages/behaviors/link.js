const LinkBehavior = Behavior({
  properties: {
    linkType: {
      type: String,
      value: 'navigateTo',
      options: ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']
    }
  },
  methods: {
    jump (url) {
      if (url) {
        const { linkType } = this.properties;
        wx[linkType]({ url });
      }
    }
  }
});
export default LinkBehavior;
