// Component Object
Component({
  name: 'Mask',
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    // 是否展示遮罩层
    show: {
      type: Boolean,
      value: false
    },
    // 动画时长，单位秒
    duration: {
      type: null,
      value: 200
    },
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100
    },
    // 自定义样式
    customStyle: String,
    // 透明度
    opacity: {
      type: Number,
      value: 0.5
    }
  },
  data: {},
  methods: {
    // 点击遮罩层
    onClick() {
      this.triggerEvent('click');
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
