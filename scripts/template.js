const compJsTemplate = () => {
  return `
  import { LinComponent } from "../common/component";
  LinComponent({
    classes: [],
    props: {},
    data: {},
    methods: {},
  });
`;
};

const compJsonTemplate = () => {
  return `
{
   "component": true
}
`;
};

const compScssTemplate = (componentName) => {
  return `
.lin-${componentName}{
    
}
`;
};

const compWxmlTemplate = (componentName) => {
  return `
<view class='custom-class lin-${componentName}'>
    
</view>
`;
};

const pageJsTemplate = () => {
  return `
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
`;
};

const pageJsonTemplate = (componentName) => {
  return `
{
  "usingComponents": {},
  "navigationBarTitleText": "${componentName}"
}
`;
};

const pageWxmlTemplate = () => {
  return `
<view class='container'>
   <demo-block title='基础用法'>
            
    </demo-block>
</view>
`;
};

module.exports = {
  compJsTemplate,
  compJsonTemplate,
  compScssTemplate,
  compWxmlTemplate,
  pageJsTemplate,
  pageJsonTemplate,
  pageWxmlTemplate
};
