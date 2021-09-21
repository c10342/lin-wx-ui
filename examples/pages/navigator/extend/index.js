// pages/navigator/extend/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        label: "网络请求",
        bgColor:
          "linear-gradient(180deg, rgba(57, 173, 219, .25) 0, rgba(42, 60, 87, .4)), linear-gradient(135deg, #670d10, #092756)",
        path: "/pages/extends/request/index"
      },
      {
        label: "本地缓存",
        bgColor: `
        linear-gradient(135deg, rgba(244, 226, 156, 0), #3b293a),
        linear-gradient(90deg, #f4e29c 0, #826057)
        `,
        path: "/pages/extends/storage/index"
      },
      {
        label: "接口缓存",
        bgColor: `
        linear-gradient(135deg, rgba(244, 226, 156, 0), #3b293a),
        linear-gradient(90deg, #f4e29c 0, #826057)
        `,
        path: "/pages/extends/apiCache/index"
      }
    ]
  }
});
