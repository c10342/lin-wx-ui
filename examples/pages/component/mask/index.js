// pages/component/mask/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false
  },

  onClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  }
});
