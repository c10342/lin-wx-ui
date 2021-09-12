// pages/component/rate/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: 1,
    value2: 2,
    value3: 2,
    value4: 2.5,
    value5: 2,
    value6: 2,
    value7: 2
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  }
});
