import { areaJsonPath } from '../../../dist/common/config';

import Request from '../../../dist/common/request';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    value: '',
    loading: false
  },

  onConfirm(event) {
    const data = event.detail;
    this.setData({
      value: data[data.length - 1].code
    });
  },

  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false
        });
      })
      .catch(() => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAreaList();
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
