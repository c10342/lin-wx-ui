import{button}from"../behaviors/button";import{openType}from"../behaviors/open-type";Component({options:{addGlobalClass:!0,multipleSlots:!0},externalClasses:["custom-class","header-class","content-class","footer-class","cancel-class","confirm-class"],behaviors:[button,openType],properties:{show:{type:Boolean,observer(t){t||this.stopLoading()}},title:String,message:String,theme:{type:String,value:"default"},useSlot:Boolean,className:String,customStyle:String,asyncClose:Boolean,messageAlign:{type:String,value:"center"},maskStyle:String,useTitleSlot:Boolean,showCancelButton:Boolean,closeOnClickMask:Boolean,confirmButtonOpenType:String,width:{type:[String,Number],value:"640rpx"},zIndex:{type:Number,value:2e3},confirmButtonText:{type:String,value:"确认"},cancelButtonText:{type:String,value:"取消"},confirmButtonColor:String,cancelButtonColor:String,showConfirmButton:{type:Boolean,value:!0},mask:{type:Boolean,value:!0},transition:{type:String,value:"scale"}},data:{onConfirm:null,onCancel:null,loading:{confirm:!1,cancel:!1}},methods:{onMaskClick(){this.onClose("mask")},onConfirm(){this.data.loading.confirm||this.handleAction("confirm")},onCancel(){this.data.loading.cancel||this.handleAction("cancel")},handleAction(t){this.data.asyncClose&&this.setData({["loading."+t]:!0}),this.onClose(t)},onCancel(t){this.onClose(t)},close(){this.setData({show:!1})},stopLoading(){this.setData({loading:{confirm:!1,cancel:!1}})},onClose(t){this.properties.asyncClose||this.close(),this.triggerEvent("close",t),this.triggerEvent(t,{dialog:this});const o=this.data["confirm"===t?"onConfirm":"onCancel"];o&&o(this)}},created:function(){},attached:function(){},ready:function(){},moved:function(){},detached:function(){}});