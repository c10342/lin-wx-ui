Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnList: [
      {
        bgColor: "#16C2C2",
        icon: "wechat",
        iconSize: "60rpx",
        text: "分享",
        fontSize: "34rpx",
        color: "#fff"
      },
      {
        bgColor: "#64B532",
        icon: "link",
        // 名称
        text: "链接",
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: "#fff"
      }
    ]
  },

  onClick(event) {
    const { detail } = event;
    wx.showToast({
      title: detail.text,
      icon: "none"
    });
  },

  onCellClick1() {
    this.setData({
      btnList: [
        {
          bgColor: "#16C2C2",
          icon: "wechat",
          iconSize: "60rpx",
          text: "分享",
          fontSize: "34rpx",
          color: "#fff"
        },
        {
          bgColor: "#64B532",
          icon: "link",
          // 名称
          text: "链接",
          // 字体大小
          fontSize: 14,
          // 字体颜色
          color: "#fff"
        }
      ]
    });
  },

  onCellClick2() {
    this.setData({
      btnList: [
        {
          bgColor: "#16C2C2",
          text: "分享",
          color: "#fff"
        },
        {
          bgColor: "#64B532",
          // 名称
          text: "链接",
          // 字体颜色
          color: "#fff"
        }
      ]
    });
  }
});
