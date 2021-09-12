Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: true,
    value2: true,
    value3: true,
    value4: true,
    value5: true,
    value6: true,
    value7: true
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  onChange1(event) {
    wx.showModal({
      title: "提示",
      content: "是否切换开关？",
      success: (res) => {
        if (res.confirm) {
          const key = event.currentTarget.dataset.key;
          this.setData({
            [key]: event.detail
          });
        }
      }
    });
  }
});
