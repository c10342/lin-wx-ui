import Request from '../../../dist/extends/request/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onGetClick() {
    // Request({
    //   url:'https://cnodejs.org/api/v1/topics',
    //   data:{
    //     page:1,
    //     limit:2
    //   }
    // }).then(res=>{
    //   console.log(res);
    // }).catch(error=>{
    //   console.log(error);
    // })
    Request.get('https://cnodejs.org/api/v1/topics', {
      data: {
        page: 1,
        limit: 2
      }
    })
      .then(() => {
        // console.log(res);
      })
      .catch(() => {
        // console.log(error);
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
