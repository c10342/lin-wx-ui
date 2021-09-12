Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: true
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  onSubmit() {
    wx.showToast({
      title: "submit",
      icon: "none"
    });
  }
});
