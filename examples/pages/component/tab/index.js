Page({
  /**
   * 页面的初始数据
   */
  data: {
    active1: 0,
    active2: 'a',
    active3: 0,
    active4: 0,
    active5: 0,
    active6: 0,
    active7: 0,
    active8: 0,
    active9: 0,
    show: false,
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },

  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.name + 1} 已被禁用`,
      icon: 'none',
    });
  },

  onClick() {
    this.setData({ show: true });
  },

  onMaskClick() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
