// pages/component/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: ""
  },

  onSearch(event) {
    wx.showToast({
      icon: "none",
      title: event.detail
    });
  },

  onCancel() {
    wx.showToast({
      icon: "none",
      title: "取消"
    });
  },

  onClick() {
    wx.showToast({
      title: "click"
    });
  }
});
