Page({
  /**
   * 页面的初始数据
   */
  data: {
    student1: {
      name: '',
      hobby: [],
      sex: '',
      public: false,
    },
    student2: {
      name: '',
      hobby: [],
      sex: '',
      public: false,
    },
    rules: {
      name: [
        {
          required: true,
          message: '姓名不能为空',
          trigger: 'blur',
        },
      ],
      hobby: [
        {
          required: true,
          message: '爱好不能为空',
          validator(rule, value, callback) {
            if (value.length === 0) {
              callback(new Error('爱好不能为空'));
            } else {
              callback();
            }
          },
        },
      ],
      sex: [
        {
          required: true,
          message: '性别不能为空',
        },
      ],
      public: [
        {
          required: true,
          message: '请选择是否公开',
        },
      ],
    },
  },

  submit1() {
    wx.showToast({
      title: '提交',
      icon: 'none',
    });
  },

  reset1() {
    wx.showToast({
      title: '重置',
      icon: 'none',
    });
    this.setData({
      student1: {
        name: '',
        hobby: [],
        sex: '',
        public: false,
      },
    });
  },

  submit2(event) {
    const $form = this.selectComponent('#form');
    $form.checkValue((flag) => {
      // console.log(flag);
    });
  },

  reset2() {
    this.setData({
      student2: {
        name: '',
        hobby: [],
        sex: '',
        public: false,
      },
    });
  },

  onInputChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail,
    });
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail,
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
