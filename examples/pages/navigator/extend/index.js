// pages/navigator/extend/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        label: '网络请求',
        bgColor:
          'linear-gradient(180deg, rgba(57, 173, 219, .25) 0, rgba(42, 60, 87, .4)), linear-gradient(135deg, #670d10, #092756)',
        path: '/pages/extends/request/index'
      },
      {
        label: '本地缓存',
        bgColor: `
        linear-gradient(135deg, rgba(244, 226, 156, 0), #3b293a),
        linear-gradient(90deg, #f4e29c 0, #826057)
        `,
        path: '/pages/extends/storage/index'
      },
      {
        label: 'api缓存',
        bgColor: `
        linear-gradient(135deg, rgba(244, 226, 156, 0), #3b293a),
        linear-gradient(90deg, #f4e29c 0, #826057)
        `,
        path: '/pages/extends/apiCache/index'
      }
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
