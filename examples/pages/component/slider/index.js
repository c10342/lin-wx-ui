// pages/component/slider/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: 50,
    value2: 10,
    value3: 50,
    value4: 50,
    value5: 50,
    value6: 50
  },

  onDrag(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
    wx.showToast({
      icon: "none",
      title: `当前值是${event.detail}`
    });
  }
});
