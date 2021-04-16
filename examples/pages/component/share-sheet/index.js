Page({
  /**
   * 页面的初始数据
   */
  data: {
    showShare1: false,
    options1: [
      {
        name: '微信',
        icon: 'wechat',
        openType: 'share'
      },
      {
        name: '微博',
        icon: 'weibo'
      },
      {
        name: '复制链接',
        icon: 'link'
      },
      {
        name: '分享海报',
        icon: 'pic'
      },
      {
        name: '二维码',
        icon: 'qrcode'
      }
    ],

    showShare2: false,
    options2: [
      [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' }
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'pic' },
        { name: '二维码', icon: 'qrcode' }
      ]
    ],

    showShare3: false,
    options3: [
      {
        name: '名称',
        isImage: true,
        icon: '/images/cat.png'
      },
      {
        name: '名称',
        isImage: true,
        icon: '/images/cat.png'
      },
      {
        name: '名称',
        isImage: true,
        icon: '/images/cat.png'
      }
    ],
    showShare4: false,
    options4: [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      {
        name: '复制链接',
        icon: 'link',
        description: '描述信息'
      },
      { name: '分享海报', icon: 'pic' },
      { name: '二维码', icon: 'qrcode' }
    ]
  },

  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true
    });
  },

  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false
    });
  },

  onSelect(event) {
    // Toast(event.detail.name);
    wx.showToast({
      title: event.detail.name,
      icon: 'none'
    });
    this.onClose(event);
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
