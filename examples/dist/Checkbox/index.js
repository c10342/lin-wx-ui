const shapeValue="round";Component({behaviors:["wx://form-field"],externalClasses:["custom-class","icon-class","label-class"],relations:{"../CheckboxGroup/index":{type:"ancestor",linked(e){this.parent=e},unlinked(){this.parent=null}}},options:{addGlobalClass:!0,multipleSlots:!0},properties:{value:Boolean,disabled:Boolean,shape:{type:String,options:["round","square"],value:"round"},checkedColor:String,iconSize:{type:[String,Number],value:"40rpx"},useIconSlot:Boolean,labelDisabled:Boolean,name:{type:null}},observers:{"value,shape":function(e,t){let a=t;e&&(a+="-active"),this.setData({iconName:a})}},data:{iconName:"round",parentDisabled:!1},methods:{toggle(){this.properties.disabled||this.data.parentDisabled||this.emitChange()},onLabelClick(){this.properties.disabled||this.data.parentDisabled||this.properties.labelDisabled||this.emitChange()},emitChange(){this.parent?this.setParentValue(!this.properties.value):this.triggerEvent("change",!this.properties.value)},setParentValue(e){let{value:t,max:a}=this.parent.properties;t=t.slice();const{name:i}=this.properties;if(e){if(a&&t.length>=a)return;-1===t.indexOf(i)&&(t.push(i),this.parent.emitChange(t))}else{const e=t.findIndex(e=>e==i);e>-1&&(t.splice(e,1),this.parent.emitChange(t))}}},created:function(){},attached:function(){},ready:function(){},moved:function(){},detached:function(){}});