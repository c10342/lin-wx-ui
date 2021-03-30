import Dialog from '../../../dist/Dialog/dialog.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
  },

  onClick1() {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容',
    }).then(() => {});
  },
  onClick2() {
    Dialog.alert({
      message: '弹窗内容',
    }).then(() => {});
  },
  onClick3() {
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
    })
      .then(() => {})
      .catch(() => {});
  },
  onClick4() {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容',
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  onClick5() {
    Dialog.alert({
      message: '弹窗内容',
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  onClick6() {
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
      asyncClose: true,
    })
      .then(() => {
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      })
      .catch(() => {
        Dialog.close();
      });
  },
  onClick7() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({ show: false });
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
