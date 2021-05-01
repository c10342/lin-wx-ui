Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    inputValue1: [],
    show2: false,
    inputValue2: []
  },

  onBtnClick(event) {
    const { show, valuekey } = event.currentTarget.dataset;
    this.setData({
      [show]: true,
      [valuekey]: []
    });
  },

  onInput(event) {
    const { valuekey, length, show } = event.currentTarget.dataset;
    const value = event.detail;
    const inputVal = this.data[valuekey];
    inputVal.push(value);
    this.setData({
      [valuekey]: inputVal
    });
    if (inputVal.length === length * 1) {
      wx.showToast({
        title: `输入的密码是${inputVal.join('')}`,
        icon: 'none'
      });
      this.setData({
        [show]: false,
        [valuekey]: []
      });
    }
  },

  onDelete(event) {
    const { valuekey } = event.currentTarget.dataset;
    const inputVal = this.data[valuekey];
    inputVal.pop();
    this.setData({
      [valuekey]: inputVal
    });
  },

  onClose(event) {
    const { show, valuekey } = event.currentTarget.dataset;
    this.setData({
      [show]: false,
      [valuekey]: []
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
