Page({
  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    date1: "2020-10-25",
    show2: false,
    date2: "2020-10-25",
    disabledBeforeDate: "2020-10-22",
    show3: false,
    date3: "2020-10-25",
    disabledAfterDate: "2020-10-27",
    show4: false,
    date4: "2020-10-25",
    disabledRangeDate: ["2020-10-10", "2020-10-15"],
    show5: false,
    date5: "2020-10-25",
    disabledDate: ["2020-10-22", "2020-10-16"]
  },

  setShowData(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },

  onConfirm(event) {
    const key = event.currentTarget.dataset.key;
    const show = event.currentTarget.dataset.show;
    this.setData({
      [key]: event.detail,
      [show]: false
    });
  }
});
