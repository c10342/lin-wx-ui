const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    columns1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    columns2: [
      {
        values: Object.keys(citys),
        className: 'column1',
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    columns3: [
      { text: '杭州', disabled: true },
      { text: '宁波' },
      { text: '温州' },
    ],
  },

  onChange(data) {
    wx.showToast({
      title: `${data.detail.index} - ${data.detail.value}`,
      icon: 'none',
    });
  },

  onChange1(event) {
    // picker, value, index
    const { picker, value } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },

  onCancel(event) {
    wx.showToast({
      title: '取消',
      icon: 'none',
    });
  },
  onConfirm(event) {
    wx.showToast({
      title: event.detail.value,
      icon: 'none',
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
