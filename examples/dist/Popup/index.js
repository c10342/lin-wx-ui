import{transition}from"../behaviors/transition";Component({options:{addGlobalClass:!0},externalClasses:["custom-class"],behaviors:[transition(!1)],properties:{zIndex:{type:Number,value:100},mask:{type:Boolean,value:!0},maskStyle:String,position:{type:String,value:"center",observer:"observeClass"},closeable:{type:Boolean,value:!1},closeIcon:{type:String,value:"close"},closeIconPosition:{type:String,value:"top-right"},closeOnClickMask:{type:Boolean,value:!0},closeIconSize:{type:String,value:"40rpx"},round:{type:Boolean,value:!1},transition:{type:String,observer:"observeClass"}},data:{},methods:{onMaskClick(){this.triggerEvent("mask-click"),this.properties.closeOnClickMask&&this.triggerEvent("close")},observeClass(){const{position:e,transition:t}=this.properties;this.setData({name:t||e})},onCloseClick(){this.triggerEvent("close")}},created:function(){this.observeClass()},attached:function(){},ready:function(){},moved:function(){},detached:function(){}});