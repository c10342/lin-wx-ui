// pages/component/checkbox/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    result1: [],
    result2: [],
    result3: [],
    list: ["a", "b", "c"]
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  onGroupChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {
    // todo
  }
});
