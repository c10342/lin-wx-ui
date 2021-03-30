import Notify from '../../../dist/Notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onClick1() {
    Notify('通知内容');
  },

  onClick2(event) {
    const type = event.currentTarget.dataset.type;
    Notify({ type, message: '通知内容' });
  },

  onClick3() {
    Notify({
      message: '自定义颜色',
      color: '#ad0000',
      background: '#ffe1e1',
    });
  },
  onClick4() {
    Notify({
      message: '自定义时长',
      duration: 1000,
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
