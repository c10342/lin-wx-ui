// pages/component/stepper/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: 1
  },

  onChange(event) {
    wx.showToast({
      icon: "none",
      title: `当前值：${event.detail}`
    });
  },

  onChange1(event) {
    setTimeout(() => {
      this.setData({
        value: event.detail
      });
    }, 3000);
  }
});
