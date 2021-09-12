// pages/component/transition/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
    show8: false,
    show9: false,
    show10: false,
    time: 1000,
    isShow: false
  },

  setShowData(event) {
    if (this.data.isShow) {
      return;
    }
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true, isShow: true });
  },

  afterEnter(event) {
    setTimeout(() => {
      const key = event.currentTarget.dataset.show;
      this.setData({ [key]: false });
    }, this.data.time);
  },

  afterLeave() {
    this.setData({ isShow: false });
  }
});
