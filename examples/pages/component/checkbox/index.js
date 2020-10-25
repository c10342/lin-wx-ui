// pages/component/checkbox/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked1:false,
    checked2:false,
    checked3:false,
    checked4:false,
    checked5:false,
    checked6:false,
    checked7:false,
    result1:[],
    result2:[]
  },

  onChange(event){
    const key = event.currentTarget.dataset.key
    this.setData({
      [key]:event.detail
    })
  },

  onGroupChange(event){
    const key = event.currentTarget.dataset.key
    this.setData({
      [key]:event.detail
    })
  },

  submit(event){
    console.log(event);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})