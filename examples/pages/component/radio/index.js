// pages/component/radio/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio1: "1",
    radio2: "1",
    radio3: "",
    radio4: "2",
    radio5: "2",
    radio6: "2",
    radio7: "2",
    radio8: "2"
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  onClick(event) {
    const name = event.currentTarget.dataset.name;
    this.setData({
      radio8: name
    });
  }
});
