Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList1: [],
    fileList2: [
      {
        url: '/images/cat.png',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: '/images/cat.png',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ],
    fileList3: [],
    fileList4: [
      {
        url: '/images/cat.png',
        status: 'uploading',
        message: '上传中',
      },
      {
        url: '/images/cat.png',
        status: 'failed',
        message: '上传失败',
      },
    ],
    fileList5: [],
    fileList6: [],
    fileList7: [],
    fileList8: [],
  },

  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!('path' in file) && 'tempFilePath' in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },

  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },

  afterRead1(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;
    const fileList = this.data[key];
    fileList.push({
      ...file,
      isVideo: true,
    });
    this.setData({
      [key]: fileList,
    });
  },

  beforeRead(event) {
    const { file, callback } = event.detail;

    if (file.tempFilePath.lastIndexOf('.jpg') > -1) {
      callback(true);
    } else {
      callback(false);
      wx.showToast({
        title: '只能上传jpg图片',
        icon: 'none',
      });
    }
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
