import Toast from "../../../dist/toast/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onClick1() {
    Toast("提示内容");
  },

  onClick2() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
  },

  onClick3() {
    Toast.success("成功文案");
  },

  onClick4() {
    Toast.fail("失败文案");
  },

  onClick5() {
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "倒计时 3 秒"
    });

    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({
          message: `倒计时 ${second} 秒`
        });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);
  }
});
