Page({
  /**
   * 页面的初始数据
   */
  data: {
    active1: 0,
    active2: "like",
    active3: 0,
    active4: 0,
    active5: 0
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  }
});
