Page({
  /**
   * 页面的初始数据
   */
  data: {
    time1: 30 * 60 * 60 * 1000,
    time2: 30 * 60 * 60 * 1000,
    timeData: {}
  },

  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },

  start() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.start();
  },

  pause() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.pause();
  },

  reset() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.reset();
  },

  finished() {
    wx.showToast({
      title: "倒计时结束",
      icon: "none"
    });
  }
});
