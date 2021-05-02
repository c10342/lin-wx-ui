Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnList: [
      {
        bgColor: '#16C2C2',
        icon: 'wechat',
        iconSize: '60rpx',
        text: '分享',
        fontSize: '34rpx',
        color: '#fff'
      },
      {
        bgColor: '#64B532',
        icon: 'link',
        // 名称
        text: '链接',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#fff'
      }
    ]
  },

  onClick(event) {
    const { detail } = event;
    wx.showToast({
      title: detail.text,
      icon: 'none'
    });
  },

  onCellClick1() {
    this.setData({
      btnList: [
        {
          bgColor: '#16C2C2',
          icon: 'wechat',
          iconSize: '60rpx',
          text: '分享',
          fontSize: '34rpx',
          color: '#fff'
        },
        {
          bgColor: '#64B532',
          icon: 'link',
          // 名称
          text: '链接',
          // 字体大小
          fontSize: 14,
          // 字体颜色
          color: '#fff'
        }
      ]
    });
  },

  onCellClick2() {
    this.setData({
      btnList: [
        {
          bgColor: '#16C2C2',
          text: '分享',
          color: '#fff'
        },
        {
          bgColor: '#64B532',
          // 名称
          text: '链接',
          // 字体颜色
          color: '#fff'
        }
      ]
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
