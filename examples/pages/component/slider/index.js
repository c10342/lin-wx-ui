// pages/component/slider/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: 50,
    value2: 10,
    value3: 50,
    value4: 50,
    value5: 50,
    value6: 50
  },

  onDrag(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
    wx.showToast({
      icon: 'none',
      title: `当前值是${event.detail}`
    });
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
  onShareAppMessage: function () {}
});
