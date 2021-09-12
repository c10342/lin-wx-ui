Page({
  /**
   * 页面的初始数据
   */
  data: {
    showShare1: false,
    options1: [
      {
        name: "微信",
        icon: "wechat",
        openType: "share"
      },
      {
        name: "微博",
        icon: "weibo"
      },
      {
        name: "复制链接",
        icon: "link"
      },
      {
        name: "分享海报",
        icon: "pic"
      },
      {
        name: "二维码",
        icon: "qrcode"
      }
    ],

    showShare2: false,
    options2: [
      [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" }
      ],
      [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "pic" },
        { name: "二维码", icon: "qrcode" }
      ]
    ],

    showShare3: false,
    options3: [
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png"
      },
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png"
      },
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png"
      }
    ],
    showShare4: false,
    options4: [
      { name: "微信", icon: "wechat" },
      { name: "微博", icon: "weibo" },
      {
        name: "复制链接",
        icon: "link",
        description: "描述信息"
      },
      { name: "分享海报", icon: "pic" },
      { name: "二维码", icon: "qrcode" }
    ]
  },

  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true
    });
  },

  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false
    });
  },

  onSelect(event) {
    // Toast(event.detail.name);
    wx.showToast({
      title: event.detail.name,
      icon: "none"
    });
    this.onClose(event);
  }
});
