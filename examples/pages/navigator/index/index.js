

Page({
  data:{
    navList:[
      {name:'基础组件',iconName:'icon-jichu',path:'/pages/navigator/basics/index'},
      {name:'表单组件',iconName:'icon-biaodan',path:'/pages/navigator/form/index'},
      {name:'反馈组件',iconName:'icon-caozuo',path:'/pages/navigator/operation/index'},
      {name:'展示组件',iconName:'icon-shitu',path:'/pages/navigator/view/index'},
      {name:'导航组件',iconName:'icon-daohang',path:'/pages/navigator/navigation/index'},
      {name:'更新日志',iconName:'icon-rizhi',path:'/pages/navigator/logs/index'},
      {name:'关于',iconName:'icon-yewu',path:'/pages/navigator/about/index'},

      // {name:'动画组件',iconName:'icon-donghua',path:'/pages/navigator/cartoon/index'},
      // {name:'布局组件',iconName:'icon-layout',path:'/pages/navigator/layout/index'},
    ]
  },
  onLoad: function () {
  },

  onCardClick(data){
    if(data.detail && data.detail.path){
      wx.navigateTo({
        url: data.detail.path
      })
    }
  }
})
