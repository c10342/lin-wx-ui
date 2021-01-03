const OpenTypeBehavior = Behavior({
  properties: {
    openType: String,
  },

  methods: {
    bindGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail);
    },

    bindContact(event) {
      this.triggerEvent('contact', event.detail);
    },

    bindGetPhoneNumber(event) {
      this.triggerEvent('getphonenumber', event.detail);
    },

    bindError(event) {
      this.triggerEvent('error', event.detail);
    },

    bindLaunchApp(event) {
      this.triggerEvent('launchapp', event.detail);
    },

    bindOpenSetting(event) {
      this.triggerEvent('opensetting', event.detail);
    },
  },
});

export default OpenTypeBehavior;
