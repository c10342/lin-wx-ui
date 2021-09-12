Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeKey1: 0,
    activeKey2: 1,
    activeKey3: 0,
    activeKey4: 0
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },

  onChange1(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
    wx.showToast({
      title: `标签${event.detail * 1 + 1}`,
      icon: "none"
    });
  }
});
