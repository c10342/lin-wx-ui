Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps1: [
      {
        text: '步骤一',
        desc: '描述信息',
      },
      {
        text: '步骤二',
        desc: '描述信息',
      },
      {
        text: '步骤三',
        desc: '描述信息',
      },
      {
        text: '步骤四',
        desc: '描述信息',
      },
    ],
    active1: 0,
    steps2: [
      {
        text: '步骤一',
      },
      {
        text: '步骤二',
      },
      {
        text: '步骤三',
      },
      {
        text: '步骤四',
      },
    ],
    active2: 0,
    active3: 0,
  },

  onClick(event) {
    const { steps, key } = event.currentTarget.dataset;
    let index = this.data[key] + 1;
    const list = this.data[steps];
    if (index >= list.length) {
      index = 0;
    }
    this.setData({
      [key]: index,
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
  onShareAppMessage: function () {},
});
