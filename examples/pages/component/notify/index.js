import Notify from "../../../dist/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onClick1() {
    Notify("通知内容");
  },

  onClick2(event) {
    const type = event.currentTarget.dataset.type;
    Notify({ type, message: "通知内容" });
  },

  onClick3() {
    Notify({
      message: "自定义颜色",
      color: "#ad0000",
      background: "#ffe1e1"
    });
  },
  onClick4() {
    Notify({
      message: "自定义时长",
      duration: 1000
    });
  }
});
