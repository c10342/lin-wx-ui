// components/extend-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      const { dataInfo } = this.properties;
      if (dataInfo.path) {
        wx.navigateTo({
          url: dataInfo.path
        });
      }
    }
  }
});
