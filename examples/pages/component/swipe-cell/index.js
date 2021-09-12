import Dialog from "../../../dist/dialog/dialog.js";
import Notify from "../../../dist/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onBeforeClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case "left":
      case "cell":
        instance.close();
        break;
      case "right":
        Dialog.confirm({
          message: "确定删除吗？"
        })
          .then(() => {
            instance.close();
          })
          .catch(() => {
            // todo
          });
        break;
    }
  },

  onOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case "left":
        Notify({
          type: "primary",
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
      case "right":
        Notify({
          type: "primary",
          message: `${name}${position}部分展示open事件被触发`
        });
        break;
    }
  },

  onClose(event) {
    const { position, name } = event.detail;

    Notify({
      type: "danger",
      message: `${name}${position}部分关闭close事件被触发`
    });
  },

  openLeft() {
    const comp = this.selectComponent("#swipe-cell");
    comp.open("left");
  },
  openRight() {
    const comp = this.selectComponent("#swipe-cell");
    comp.open("right");
  },
  close() {
    const comp = this.selectComponent("#swipe-cell");
    comp.close();
  }
});
