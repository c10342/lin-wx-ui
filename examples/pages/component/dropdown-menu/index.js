Page({
  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      {
        text: '全部商品',
        value: 0,
      },
      {
        text: '新款商品',
        value: 1,
      },
      {
        text: '活动商品',
        value: 2,
      },
    ],
    option2: [
      {
        text: '默认排序',
        value: 'a',
      },
      {
        text: '好评排序',
        value: 'b',
      },
      {
        text: '销量排序',
        value: 'c',
      },
    ],
    value1: 0,
    value2: 'a',

    value4: 0,
    value5: 'a',

    value6: 1,
    value7: 'b',

    value8: 1,
    value9: 'b',

    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    switch1: false,
    switch2: false,
    option3: [
      {
        text: '全部商品',
        value: 0,
      },
      {
        text: '新款商品',
        value: 1,
      },
      {
        text: '活动商品',
        value: 2,
      },
    ],
    value3: 0,
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },

  onSwitchChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },

  onConfirm() {
    this.selectComponent('#item').toggle();
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
