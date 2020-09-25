// components/componentCell/index.js
Component({
  options:{
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    dataInfo:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCellClick(){
      wx.navigateTo({
        url: this.data.dataInfo.path,
      })
    }
  }
})
