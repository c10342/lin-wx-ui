
Component({
    options: {
      addGlobalClass: true,
      multipleSlots: true,
    },
    externalClasses: ["custom-class"],
    properties: {
      text:String,
      icon:String,
      iconColor:String,
      dot:Boolean,
      badge:String,
      url:String,
      linkType:{
        type:String,
        value:'navigateTo',
        options:['navigateTo','redirectTo','switchTab','reLaunch']
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
