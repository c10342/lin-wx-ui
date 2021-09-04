Component({
  name: 'Toast',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'icon-class',
    'loading-class',
    'message-class',
    'text-class'
  ],
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: false
    },
    // 是否显示遮罩层
    mask: Boolean,
    // 内容
    message: String,
    // 是否禁止背景点击
    forbidClick: Boolean,
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100
    },
    // 位置
    position: {
      type: String,
      value: 'middle',
      options: ['top', 'bottom', 'middle']
    },
    // 提示类型
    type: {
      type: String,
      value: 'text',
      options: ['text', 'loading', 'success', 'fail']
    }
  },
  data: {},
  methods: {},
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
