import Toast from '../../../dist/Toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onClick1() {
    Toast('提示内容');
  },

  onClick2() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    });
  },

  onClick3() {
    Toast.success('成功文案');
  },

  onClick4() {
    Toast.fail('失败文案');
  },

  onClick5() {
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '倒计时 3 秒'
    });

    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({
          message: `倒计时 ${second} 秒`
        });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);
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
