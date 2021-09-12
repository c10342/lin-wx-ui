import Dialog from "../../../dist/dialog/dialog.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  onClick1() {
    Dialog.alert({
      title: "标题",
      message: "弹窗内容"
    }).then(() => {
      // todo
    });
  },
  onClick2() {
    Dialog.alert({
      message: "弹窗内容"
    }).then(() => {
      // todo
    });
  },
  onClick3() {
    Dialog.confirm({
      title: "标题",
      message: "弹窗内容"
    })
      .then(() => {
        // todo
      })
      .catch(() => {
        // todo
      });
  },
  onClick4() {
    Dialog.alert({
      title: "标题",
      message: "弹窗内容",
      theme: "round-button"
    }).then(() => {
      // on close
    });
  },
  onClick5() {
    Dialog.alert({
      message: "弹窗内容",
      theme: "round-button"
    }).then(() => {
      // on close
    });
  },
  onClick6() {
    Dialog.confirm({
      title: "标题",
      message: "弹窗内容",
      asyncClose: true
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
      show: true
    });
  },
  onClose() {
    this.setData({ show: false });
  }
});
