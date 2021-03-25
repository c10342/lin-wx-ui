import TransitionBehavior from '../behaviors/transition';
import SafeAreaInsetTopBehavior from '../behaviors/safeAreaInsetTop';

Component({
  name: 'Popup',
  options: {
    addGlobalClass: true
  },
  behaviors: [TransitionBehavior(false), SafeAreaInsetTopBehavior],
  externalClasses: ['custom-class'],
  properties: {
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    // 自定义遮罩层样式
    maskStyle: String,
    // 弹出位置
    position: {
      type: String,
      value: 'center',
      observer: 'observeClass',
      options: ['top', 'bottom', 'right', 'left', 'center']
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      value: false
    },
    // 关闭图标名称
    closeIcon: { type: String, value: 'close' },
    // 关闭图标的位置
    closeIconPosition: {
      type: String,
      value: 'top-right',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    },
    // 是否在点击遮罩层后关闭
    closeOnClickMask: {
      type: Boolean,
      value: true
    },
    // 关闭图标大小
    closeIconSize: {
      type: [String, Number],
      value: '40rpx'
    },
    // 是否显示圆角
    round: {
      type: Boolean,
      value: false
    },
    // 动画类型，优先级高于 position
    transition: {
      type: String,
      observer: 'observeClass'
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    // 点击遮罩层
    onMaskClick () {
      this.triggerEvent('mask-click');
      if (this.properties.closeOnClickMask) {
        this.triggerEvent('close');
      }
    },
    // 更新动画名称
    observeClass () {
      const { position, transition } = this.properties;
      this.setData({ name: transition || position });
    },
    // 点击关闭按钮
    onCloseClick () {
      this.triggerEvent('close');
    }
  },
  created () {
    this.observeClass();
  },
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
