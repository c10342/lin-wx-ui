Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    actions1: [
      {
        name: "选项一"
      },
      {
        name: "选项二"
      },
      {
        name: "选项三"
      }
    ],

    show2: false,
    actions2: [
      {
        name: "选项一"
      },
      {
        name: "选项二"
      },
      {
        name: "选项三"
      }
    ],
    show3: false,
    actions3: [
      {
        name: "选项一"
      },
      {
        name: "选项二"
      },
      {
        name: "选项三",
        subname: "描述信息"
      }
    ],
    show4: false,
    actions4: [
      { name: "着色选项", color: "#ee0a24" },
      { loading: true },
      { name: "禁用选项", disabled: true }
    ],
    show5: false,
    show6: false,
    actions6: [
      {
        name: "分享给好友",
        openType: "share"
      }
    ]
  },

  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false
    });
  },
  onCancel(event) {
    const key = event.currentTarget.dataset.key;
    wx.showToast({
      title: "取消",
      icon: "none"
    });
    this.setData({
      [key]: false
    });
  },

  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none"
    });
  },

  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true
    });
  }
});
