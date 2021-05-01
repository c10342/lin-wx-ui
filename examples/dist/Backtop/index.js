import pageScrollBehavior from '../behaviors/page-scroll';
import { getViewPort } from '../common/utils';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [
    pageScrollBehavior(function (event) {
      const scrollTop = event.scrollTop || 0;
      this.handeScroll(scrollTop);
    })
  ],
  externalClasses: ['custom-class'],
  properties: {
    useSlot: {
      type: Boolean,
      value: false
    },
    visibilityHeight: {
      type: Number,
      value: 50
    },
    scrollTop: {
      type: Number,
      value: 0
    },
    selector: {
      type: String
    },
    duration: {
      type: Number,
      value: 300
    },
    right: {
      type: [String, Number],
      value: '40rpx'
    },
    bottom: {
      type: [String, Number],
      value: '40rpx'
    }
  },
  data: {
    show: false
  },
  methods: {
    handeScroll(scrollTop) {
      const visibilityHeight = this.properties.visibilityHeight;
      let show = false;
      if (scrollTop > visibilityHeight) {
        show = true;
      } else {
        show = false;
      }
      if (show !== this.data.show) {
        this.setData({ show });
      }
    },
    onClick() {
      const { duration, selector, scrollTop } = this.properties;
      const params = { duration };
      if (selector) {
        params.selector = selector;
      } else {
        params.scrollTop = scrollTop;
      }
      wx.pageScrollTo({
        ...params,
        success: () => {
          this.triggerEvent('success');
        },
        fail: () => {
          this.triggerEvent('fail');
        },
        complete: () => {
          this.triggerEvent('complete');
        }
      });
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    getViewPort(this).then((res) => {
      this.handeScroll(res.scrollTop);
    });
  },
  moved: function () {},
  detached: function () {}
});
