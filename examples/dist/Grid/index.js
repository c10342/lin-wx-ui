Component({options:{addGlobalClass:!0,multipleSlots:!0},relations:{"../GridItem/index":{type:"descendant",linked(e){this.children=this.children||[],this.children.push(e),this.updateChildren()},unlinked(e){this.children=(this.children||[]).filter(t=>t!==e),this.updateChildren()}}},externalClasses:["custom-class"],properties:{columnNum:{type:Number,value:4,observer:"updateChildren"},iconSize:{type:[String,Number],value:"56rpx",observer:"updateChildren"},gutter:{type:[String,Number],value:0,observer:"updateChildren"},border:{type:Boolean,value:!0,observer:"updateChildren"},center:{type:Boolean,value:!0,observer:"updateChildren"},square:{type:Boolean,observer:"updateChildren"},direction:{type:String,value:"vertical",options:["vertical","horizontal"],observer:"updateChildren"}},data:{},methods:{updateChildren(){(this.children||[]).forEach(e=>{e.updateStyle()})}},created:function(){},attached:function(){},ready:function(){},moved:function(){},detached:function(){}});