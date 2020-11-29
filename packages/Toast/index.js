
Component({
    options: {
      addGlobalClass: true,
      multipleSlots: true,
    },
    externalClasses: ["custom-class"],
    properties: {
      show:{
        type:Boolean,
        value:true
      },
      mask:Boolean,
      message:String,
      forbidClick:Boolean,
      zIndex:{
        type:Number,
        value:100
      },
      position:{
        type:String,
        value:'middle',
        options:['top','bottom','middle']
      },
      type:{
        type:String,
        value:'text'
      }
    },
    data: {},
    methods: {},
    created: function () {},
    attached: function () {},
    ready: function () {},
    moved: function () {},
    detached: function () {},
});
