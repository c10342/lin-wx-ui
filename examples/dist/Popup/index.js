import TransitionBehavior from '../behaviors/transition';
import { getSystemInfoSync } from '../common/utils';

Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  behaviors: [TransitionBehavior(false)],
  properties: {
    zIndex: {
      type: Number,
      value: 100
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskStyle: String,
    position: {
      type: String,
      value: 'center',
      observer: 'observeClass',
      options: ['top', 'bottom', 'right', 'left', 'center']
    },
    closeable: {
      type: Boolean,
      value: false
    },
    closeIcon: { type: String, value: 'close' },
    closeIconPosition: {
      type: String,
      value: 'top-right',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    },
    closeOnClickMask: {
      type: Boolean,
      value: true
    },
    closeIconSize: {
      type: [String, Number],
      value: '40rpx'
    },
    round: {
      type: Boolean,
      value: false
    },
    transition: {
      type: String,
      observer: 'observeClass'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: '0px'
  },
  methods: {
    onMaskClick () {
      this.triggerEvent('mask-click');
      if (this.properties.closeOnClickMask) {
        this.triggerEvent('close');
      }
    },
    observeClass () {
      const { position, transition } = this.properties;
      this.setData({ name: transition || position });
    },
    onCloseClick () {
      this.triggerEvent('close');
    }
  },
  created () {
    this.observeClass();
  },
  attached () {},
  ready () {
    const { statusBarHeight } = getSystemInfoSync();
    this.setData({
      statusBarHeight: `${statusBarHeight}px`
    });
  },
  moved () {},
  detached () {}
});
