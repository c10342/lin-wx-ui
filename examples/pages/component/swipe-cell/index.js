import Dialog from '../../../dist/Dialog/dialog.js';
import Notify from '../../../dist/Notify/notify'
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    onBeforeClose(event) {
      const { position, instance } = event.detail;
      switch (position) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          }).catch(()=>{});
          break;
      }
    },

    onOpen(event) {
      const { position, name } = event.detail;
      switch (position) {
        case 'left':
          Notify({
            type: 'primary',
            message: `${name}${position}部分展示open事件被触发`,
          });
          break;
        case 'right':
          Notify({
            type: 'primary',
            message: `${name}${position}部分展示open事件被触发`,
          });
          break;
      }
    },

    onClose(event){
      const { position, name } = event.detail;
      
      Notify({
        type: 'danger',
        message: `${name}${position}部分关闭close事件被触发`,
      });
    },

    openLeft(){
      const comp = this.selectComponent('#swipe-cell')
      comp.open('left')
    },
    openRight(){
      const comp = this.selectComponent('#swipe-cell')
      comp.open('right')
    },
    close(){ 
      const comp = this.selectComponent('#swipe-cell')
      comp.close()
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
