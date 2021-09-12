Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    inputValue1: [],
    show2: false,
    inputValue2: []
  },

  onBtnClick(event) {
    const { show, valuekey } = event.currentTarget.dataset;
    this.setData({
      [show]: true,
      [valuekey]: []
    });
  },

  onInput(event) {
    const { valuekey, length, show } = event.currentTarget.dataset;
    const value = event.detail;
    const inputVal = this.data[valuekey];
    inputVal.push(value);
    this.setData({
      [valuekey]: inputVal
    });
    if (inputVal.length === length * 1) {
      wx.showToast({
        title: `输入的密码是${inputVal.join("")}`,
        icon: "none"
      });
      this.setData({
        [show]: false,
        [valuekey]: []
      });
    }
  },

  onDelete(event) {
    const { valuekey } = event.currentTarget.dataset;
    const inputVal = this.data[valuekey];
    inputVal.pop();
    this.setData({
      [valuekey]: inputVal
    });
  },

  onClose(event) {
    const { show, valuekey } = event.currentTarget.dataset;
    this.setData({
      [show]: false,
      [valuekey]: []
    });
  }
});
