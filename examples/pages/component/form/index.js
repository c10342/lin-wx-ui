Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {
      name: '',
      age: '',
      address: ''
    },
    rules: {
      name: [{
        required: true,
        message: '姓名不能为空',
      }],
      age: [{
        required: true,
        message: '年龄不能为空',
      }]
    },
  },

  submit(event) {
    const $form = this.selectComponent('#form')
    $form.checkValue((flag)=>{
      console.log(flag);
    })
  },

  reset(){
    const $form = this.selectComponent('#form')
    $form.clearValidate()
  },

  onInputChange(event){
    const {key} = event.currentTarget.dataset
    this.setData({
      [key]:event.detail
    })
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

  },
})
