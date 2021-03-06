import { WHITE } from '../common/color';
import { getSystemInfoSync } from '../common/utils';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: 'danger',
      options: ['success', 'primary', 'warning', 'danger', 'info']
    },
    message: String,
    duration: {
      type: Number,
      value: 3000
    },
    color: {
      type: String,
      value: WHITE
    },
    top: {
      type: [String, Number],
      value: '0px'
    },
    background: String,
    zIndex: {
      type: Number,
      value: 100
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },

  data: {
    show: false,
    onClick: null,
    onOpened: null,
    oClose: null,
    statusBarHeight: '0px'
  },
  methods: {
    show () {
      const { duration } = this.properties;
      const { onOpened } = this.data;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.setData({ show: true });
      if (onOpened) {
        wx.nextTick(onOpened);
      }
      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },
    hide () {
      const { oClose } = this.data;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.setData({ show: false });

      if (oClose) {
        wx.nextTick(oClose);
      }
    },
    onTap (event) {
      const { onClick } = this.data;
      if (onClick) {
        onClick(event.detail);
      }
    }
  },
  created () {},
  attached () {},
  ready () {
    this.timer = null;
    const { statusBarHeight } = getSystemInfoSync();
    this.setData({
      statusBarHeight: `${statusBarHeight}px`
    });
  },
  moved () {},
  detached () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
});
