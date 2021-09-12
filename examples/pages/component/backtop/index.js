Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentKey: -1
  },

  onClick(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      currentKey: key
    });
  }
});
