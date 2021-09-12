import { areaJsonPath } from "../../../dist/common/config";

import Request from "../../../dist/common/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    value: "",
    loading: false
  },

  onConfirm(event) {
    const data = event.detail;
    this.setData({
      value: data[data.length - 1].code
    });
  },

  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false
        });
      })
      .catch(() => {
        wx.showToast({
          title: "请求失败",
          icon: "none"
        });
        this.setData({ loading: false });
      });
  }
});
