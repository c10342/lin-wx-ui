Page({
  /**
   * 页面的初始数据
   */
  data: {
    anchorList: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    activeTab: "1"
  },

  onTabClick(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({
      activeTab: index
    });
  }
});
