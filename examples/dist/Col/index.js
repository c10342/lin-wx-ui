Component({options:{addGlobalClass:!0},externalClasses:["custom-class"],relations:{"../Row/index":{type:"ancestor"}},properties:{span:Number,offset:Number},data:{viewStyle:""},methods:{setGutter(t){const e=t/2+"px",a=t?`padding-left: ${e}; padding-right: ${e};`:"";a!==this.data.viewStyle&&this.setData({viewStyle:a})}},created:function(){},attached:function(){},ready:function(){},moved:function(){},detached:function(){}});