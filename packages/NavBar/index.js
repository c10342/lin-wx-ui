import SafeAreaInsetTopBehavior from '../behaviors/safeAreaInsetTop';

Component({
  name: 'NavBar',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [SafeAreaInsetTopBehavior],
  externalClasses: ['custom-class', 'left-class', 'right-class', 'title-class'],
  properties: {
    // 标题
    title: String,
    // 左侧文案
    leftText: String,
    // 右侧文案
    rightText: String,
    // 是否显示左侧箭头
    leftArrow: Boolean,
    // 是否固定在顶部
    fixed: Boolean,
    // 是否显示下边框
    border: {
      type: Boolean,
      value: true
    },
    // z-index 层级
    zIndex: {
      type: Number,
      value: 1
    },
    // 根节点自定义样式
    customStyle: String
  },
  data: {},
  methods: {
    // 点击左侧区域
    onLeftClick() {
      this.triggerEvent('click-left');
    },
    // 点击右侧区域
    onRightClick() {
      this.triggerEvent('click-right');
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
