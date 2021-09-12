Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps1: [
      {
        text: "步骤一",
        desc: "描述信息"
      },
      {
        text: "步骤二",
        desc: "描述信息"
      },
      {
        text: "步骤三",
        desc: "描述信息"
      },
      {
        text: "步骤四",
        desc: "描述信息"
      }
    ],
    active1: 0,
    steps2: [
      {
        text: "步骤一"
      },
      {
        text: "步骤二"
      },
      {
        text: "步骤三"
      },
      {
        text: "步骤四"
      }
    ],
    active2: 0,
    active3: 0
  },

  onClick(event) {
    const { steps, key } = event.currentTarget.dataset;
    let index = this.data[key] + 1;
    const list = this.data[steps];
    if (index >= list.length) {
      index = 0;
    }
    this.setData({
      [key]: index
    });
  }
});
