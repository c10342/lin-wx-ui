
Component({
    options: {
      addGlobalClass: true,
      multipleSlots: true,
    },
    externalClasses: ["custom-class"],
    properties: {
      columnNum:{
        type:Number,
        value:4
      },
      iconSize:{
        type:String,
        value:'56rpx'
      },
      gutter:{
        type:[String,Number],
        value:0
      },
      border:{
        type:Boolean,
        value:true
      },
      center:{
        type:Boolean,
        value:true
      },
      square:Boolean,
      clickable:Boolean,
      direction:{
        type:String,
        value:'vertical',
        options:['vertical','horizontal']
      },
      useSlot:Boolean
    },
    data: {},
    methods: {},
    created: function () {},
    attached: function () {},
    ready: function () {},
    moved: function () {},
    detached: function () {},
});
