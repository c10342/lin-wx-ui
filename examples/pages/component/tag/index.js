Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: {
      primary: true,
      success: true
    }
  },

  onClose(event) {
    this.setData({
      [`show.${event.target.id}`]: false
    });
  }
});
