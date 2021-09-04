import pageScrollBehavior from "../behaviors/page-scroll";
import { getViewPort } from "../common/utils";

Component({
  name: "Backtop",
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [
    pageScrollBehavior(function (
      event: WechatMiniprogram.Page.IPageScrollOption
    ) {
      const scrollTop = event.scrollTop || 0;
      // @ts-ignore
      this.handeScroll(scrollTop);
    })
  ],
  externalClasses: ["custom-class", "container-class", "triangle-calss"],
  properties: {
    // 是否使用自定义插槽
    useSlot: {
      type: Boolean,
      value: false
    },
    // 滚动高度达到此参数值才出现
    visibilityHeight: {
      type: Number,
      value: 50
    },
    // 回到顶部距离顶部的距离
    scrollTop: {
      type: Number,
      value: 0
    },
    // 锚点
    selector: {
      type: String
    },
    // 动画时长
    duration: {
      type: Number,
      value: 300
    },
    // 距离右边距离
    right: {
      // @ts-ignore
      type: [String, Number],
      value: "40rpx"
    },
    // 距离底部距离
    bottom: {
      // @ts-ignore
      type: [String, Number],
      value: "40rpx"
    }
  },
  data: {
    // 是否显示
    show: false
  },
  methods: {
    handeScroll(scrollTop) {
      const visibilityHeight = this.properties.visibilityHeight;
      let show = false;
      // 向上滚动的距离大于阈值，则显示，否则隐藏
      if (scrollTop > visibilityHeight) {
        show = true;
      } else {
        show = false;
      }
      if (show !== this.data.show) {
        this.setData({ show });
      }
    },
    // 点击返回顶部
    onClick() {
      const { duration, selector, scrollTop } = this.properties;
      const params: {
        duration: number;
        selector?: string;
        scrollTop?: number;
      } = { duration };
      // 判断是否有锚点，有锚点不能设置scrollTop，否随着锚点会失效
      if (selector) {
        params.selector = selector;
      } else {
        params.scrollTop = scrollTop;
      }
      // 滚动到指定位置
      wx.pageScrollTo({
        ...params,
        success: () => {
          this.triggerEvent("success");
        },
        fail: () => {
          this.triggerEvent("fail");
        },
        complete: () => {
          this.triggerEvent("complete");
        }
      });
    }
  },
  ready: function () {
    // 初始化的时候执行一下滚动，判断是否需要显示组件
    getViewPort(this).then((res) => {
      this.handeScroll(res.scrollTop);
    });
  }
});
