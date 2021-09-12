// pages/component/field/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    value8: "",
    errorMessage: "用户名不能为空"
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;

    this.setData({
      [key]: event.detail
    });
  }
});
