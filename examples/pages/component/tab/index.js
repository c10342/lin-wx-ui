Page({
  /**
   * 页面的初始数据
   */
  data: {
    active1: 0,
    active2: "a",
    active3: 0,
    active4: 0,
    active5: 0,
    active6: 0,
    active7: 0,
    active8: 0,
    active9: 0,
    show: false
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name
    });
  },

  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.name + 1} 已被禁用`,
      icon: "none"
    });
  },

  onClick() {
    this.setData({ show: true });
  },

  onMaskClick() {
    this.setData({ show: false });
  }
});
