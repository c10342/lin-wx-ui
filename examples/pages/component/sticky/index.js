Page({
  /**
   * 页面的初始数据
   */
  data: {
    container: null,
    scrollTop: 0,
    offsetTop: 0
  },

  onScroll(event) {
    wx.createSelectorQuery()
      .select("#scroller")
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top
        });
      })
      .exec();
  }
});
