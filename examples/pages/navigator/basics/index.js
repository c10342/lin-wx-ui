// pages/basics/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { name: 'Button 按钮', path: '/pages/component/button/index' },
      { name: 'Icon 图标', path: '/pages/component/icon/index' },
      { name: 'Image 图片', path: '/pages/component/image/index' },
      { name: 'Loading 加载', path: '/pages/component/loading/index' },
      { name: 'Layout 布局', path: '/pages/component/layout/index' },
      { name: 'Cell 单元格', path: '/pages/component/cell/index' },
      { name: 'Transition 动画', path: '/pages/component/transition/index' },
      { name: 'Popup 弹出层', path: '/pages/component/popup/index' }
    ]
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
