// pages/about/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  copyLink(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.link,
      success: () => {
        wx.showToast({
          title: "已复制",
          duration: 1000
        });
      }
    });
  }
});
