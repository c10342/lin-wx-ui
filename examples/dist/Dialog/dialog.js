let queue=[];const defaultOptions={show:!1,title:"",width:"640rpx",theme:"default",message:"",zIndex:100,mask:!0,selector:"#lin-dialog",className:"",asyncClose:!1,transition:"scale",customStyle:"",messageAlign:"center",maskStyle:"",confirmButtonText:"确认",cancelButtonText:"取消",showConfirmButton:!0,showCancelButton:!1,closeOnClickMask:!1,confirmButtonOpenType:""};let currentOptions={...defaultOptions};function getContext(){const t=getCurrentPages();return t[t.length-1]}const Dialog=t=>(t={...currentOptions,...t},new Promise((e,o)=>{const n=(t.context||getContext()).selectComponent(t.selector);delete t.context,delete t.selector,n?(n.setData({onCancel:o,onConfirm:e,...t}),wx.nextTick(()=>{n.setData({show:!0})}),queue.push(n)):console.warn("未找到 lin-dialog 节点，请确认 selector 及 context 是否正确")}));Dialog.alert=t=>Dialog(t),Dialog.confirm=t=>Dialog({showCancelButton:!0,...t}),Dialog.close=()=>{queue.forEach(t=>{t.close()}),queue=[]},Dialog.stopLoading=()=>{queue.forEach(t=>{t.stopLoading()})},Dialog.currentOptions=currentOptions,Dialog.defaultOptions=defaultOptions,Dialog.setDefaultOptions=t=>{currentOptions={...currentOptions,...t},Dialog.currentOptions=currentOptions},Dialog.resetDefaultOptions=()=>{currentOptions={...defaultOptions},Dialog.currentOptions=currentOptions},Dialog.resetDefaultOptions();export default Dialog;