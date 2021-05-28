import apiCache from '../../../dist/extends/apiCache/index';

import markdown from './markdown';

apiCache.setCacheConfig({ cache: 1, expire: 5000 });
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markdown
  },

  // onClick() {
  //   apiCache
  //     .get('https://cnodejs.org/api/v1/topics', {
  //       data: {
  //         page: 1,
  //         limit: 4
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // },

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
