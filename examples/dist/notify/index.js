import { WHITE } from '../common/color';
import SafeAreaInsetTopBehavior from '../behaviors/safeAreaInsetTop';

Component({
  name: 'Notify',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [SafeAreaInsetTopBehavior],
  externalClasses: ['custom-class'],
  properties: {
    // 类型
    type: {
      type: String,
      value: 'danger',
      options: ['success', 'primary', 'warning', 'danger', 'info']
    },
    // 展示文案
    message: String,
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      value: 3000
    },
    // 字体颜色
    color: {
      type: String,
      value: WHITE
    },
    // 顶部距离
    top: {
      type: [String, Number],
      value: '0px'
    },
    // 背景颜色
    background: String,
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100
    }
  },

  data: {
    // 是否显示
    show: false,
    // 点击的回调函数
    onClick: null,
    // 打开的回调函数
    onOpened: null,
    // 关闭的回调函数
    oClose: null
  },
  methods: {
    // 显示组件
    show() {
      const { duration } = this.properties;
      const { onOpened } = this.data;
      this.clearTimer();
      this.setData({ show: true });
      if (onOpened) {
        // 执行打开回调函数
        wx.nextTick(onOpened);
      }
      if (duration > 0 && duration !== Infinity) {
        // duration大于0或者duration不是无穷大
        // 则自动消失
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },
    // 隐藏组件
    hide() {
      const { oClose } = this.data;
      this.clearTimer();
      this.setData({ show: false });
      if (oClose) {
        // 执行关闭回调函数
        wx.nextTick(oClose);
      }
    },
    // 清空定时器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    // 点击组件
    onTap(event) {
      const { onClick } = this.data;
      if (onClick) {
        // 执行点击回调函数
        onClick(event.detail);
      }
    }
  },
  created() {},
  attached() {},
  ready() {
    this.timer = null;
  },
  moved() {},
  detached() {
    this.clearTimer();
  }
});
