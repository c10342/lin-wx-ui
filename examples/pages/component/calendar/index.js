Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    date1: '2020-10-25',
    show2: false,
    date2: '2020-10-25',
    disabledBeforeDate: '2020-10-22',
    show3: false,
    date3: '2020-10-25',
    disabledAfterDate: '2020-10-27',
    show4: false,
    date4: '2020-10-25',
    disabledRangeDate: ['2020-10-10', '2020-10-15'],
    show5: false,
    date5: '2020-10-25',
    disabledDate: ['2020-10-22', '2020-10-16']
  },

  setShowData(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },

  onConfirm(event) {
    const key = event.currentTarget.dataset.key;
    const show = event.currentTarget.dataset.show;
    this.setData({
      [key]: event.detail,
      [show]: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(new Date('2020-10-22'));
    // this.setData({
    //   date1:new Date('2020-10-22').getTime()
    // })
  },

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
