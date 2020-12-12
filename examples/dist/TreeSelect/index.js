

Component({
    options: {
      addGlobalClass: true,
      multipleSlots: true,
    },
    externalClasses: ["custom-class"],
    properties: {
      items:{
        type:Array,
        value:[],
        observer:'updateSubItems'
      },
      mainActiveIndex:{
        type:Number,
        value:0,
        observer:'updateSubItems'
      },
      navLabelKey:{
        type:String,
        value:'text'
      },
      contentLabelKey:{
        type:String,
        value:'text'
      },
      contentValueKey:{
        type:String,
        value:'id'
      },
      activeId:{
        type:null
      },
      max:{
        type:Number,
        value:Infinity
      },
      selectedIcon:String,
      height:{
        type:[String,Number]
      }
    },
    data: {
      subItems:[]
    },
    methods: {
      updateSubItems(){
        const {items,mainActiveIndex} = this.properties

        const {children = []} = items[mainActiveIndex] || {}
        this.setData({
          subItems:children
        })
      },
      onNavClick(event){
        const {index} = event.currentTarget.dataset
        const item = this.properties.items[index]
        if(item.disabled){
          return
        }
        this.triggerEvent('nav-click',{index})
      },
      onItemClick(event){
        const {item} = event.currentTarget.dataset
        if(item.disabled){
          return
        }
        const {activeId,contentValueKey,max} = this.properties
        const isArray = Array.isArray(activeId)
        const isOverMax = isArray && activeId.length>=max
        const isSelect = isArray?activeId.indexOf(item[contentValueKey])>-1:activeId===item[contentValueKey]
        if(!isOverMax || isSelect ){
          this.triggerEvent('item-click',item)
        }
      }
    },
    created: function () {},
    attached: function () {},
    ready: function () {},
    moved: function () {},
    detached: function () {},
});
