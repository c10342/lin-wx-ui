Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onClickIcon() {
    // Toast('点击图标');
    wx.showToast({
      title: "点击图标",
      icon: "none"
    });
  },

  onClickButton() {
    // Toast('点击按钮');
    wx.showToast({
      title: "点击按钮",
      icon: "none"
    });
  }
});
