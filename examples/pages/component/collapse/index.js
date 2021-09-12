Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames1: ["1"],
    activeNames2: "1",
    activeNames3: ["1"],
    activeNames4: [],
    activeNames5: ["1"]
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;

    this.setData({
      [key]: event.detail
    });
  },

  onOpen(event) {
    wx.showToast({
      title: `展开: ${event.detail}`,
      icon: "none"
    });
  },
  onClose(event) {
    wx.showToast({
      title: `关闭: ${event.detail}`,
      icon: "none"
    });
  }
});
