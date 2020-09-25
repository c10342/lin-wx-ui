// components/navCard/index.js
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
    onItemTap(){
      // console.log(this.data.dataInfo);
      
      this.triggerEvent('cardTap',this.data.dataInfo)
    }
  }
})
