// import storage from '../../../dist/extends/storage/index.js';

import markdown from './markdown';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    markdown
  },

  // onSet() {
  //   for (let i = 0; i < 100; i++) {
  //     storage.set(`test-${i}`, i);
  //   }
  // },

  // onGet() {
  //   console.log(storage.get('test'));
  // },

  // onHas() {
  //   console.log(storage.has('demo'));
  // },

  // onKeys() {
  //   console.log(storage.keys());
  // },

  // onValues() {
  //   console.log(storage.values());
  // },

  // onForEach() {
  //   storage.forEach((key, value, index) => {
  //     console.log(key, value, index);
  //   });
  // },

  // onLength() {
  //   console.log(storage.length);
  // },

  // onRemove() {
  //   storage.remove('test');
  // },

  // onClear() {
  //   storage.clear();
  // },

  // onInfo() {
  //   console.log(wx.getStorageInfoSync());
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
