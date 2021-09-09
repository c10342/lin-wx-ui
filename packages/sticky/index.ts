import { LinComponent } from "../common/component";
import pageScrollBehavior from "../behaviors/page-scroll";
import { getRect } from "../common/utils";
import { isFunction } from "../common/is";

const ROOT_ELEMENT = ".lin-sticky";
LinComponent({
  mixins: [
    pageScrollBehavior(function (event) {
      // @ts-ignore
      if (this.properties.scrollTop != null) {
        return;
      }
      // @ts-ignore
      this.onScroll(event);
    })
  ],
  classes: ["wrapper-class"],
  props: {
    // 吸顶时与顶部的距离，单位 px
    offsetTop: {
      type: Number,
      value: 0,
      observer: "onScroll"
    },
    // 吸顶时的 z-index
    zIndex: {
      type: Number,
      value: 99
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      observer: "onScroll"
    },
    // 一个函数，返回容器对应的 NodesRef 节点
    container: {
      type: null,
      observer: "onScroll"
    },
    // 当前滚动区域的滚动位置，非 null 时会禁用页面滚动事件的监听
    scrollTop: {
      type: null,
      observer(val) {
        this.onScroll({ scrollTop: val });
      }
    }
  },
  data: {
    // 是否固定定位
    fixed: false,
    // y轴位移距离
    transform: 0,
    // 容器高度
    height: 0
  },
  methods: {
    // 滚动事件
    onScroll({ scrollTop } = {}) {
      const { container, offsetTop, disabled } = this.properties;
      if (disabled) {
        // 禁用情况
        this.setDataAfterDiff({
          fixed: false,
          transform: 0
        });
        return;
      }

      // 滚动的高度
      this.scrollTop = scrollTop || this.scrollTop;

      if (isFunction(container)) {
        Promise.all([
          getRect(this, ROOT_ELEMENT),
          this.getContainerRect()
        ]).then(([root, wrapperContainer]) => {
          if (
            offsetTop + root.height >
            wrapperContainer.height + wrapperContainer.top
          ) {
            // 容器离开视区
            this.setDataAfterDiff({
              fixed: false,
              transform: wrapperContainer.height - root.height
            });
          } else if (offsetTop >= root.top) {
            // 容器粘性的位置
            this.setDataAfterDiff({
              fixed: true,
              height: root.height,
              transform: 0
            });
          } else {
            // 还没到到达粘性位置
            this.setDataAfterDiff({
              fixed: false,
              transform: 0
            });
          }
        });
        return;
      }

      getRect(this, ROOT_ELEMENT).then((root) => {
        if (offsetTop > root.top) {
          // 到达粘性的位置
          this.setDataAfterDiff({
            fixed: true,
            height: root.height
          });
        } else {
          this.setDataAfterDiff({ fixed: false });
        }
      });
    },
    // 找出不同的数据，并设置
    setDataAfterDiff(data) {
      wx.nextTick(() => {
        const diff = Object.keys(data).reduce((prev, key) => {
          if (data[key] !== this.properties[key]) {
            prev[key] = data[key];
          }
          return prev;
        }, {});

        this.setData(diff);

        this.triggerEvent("scroll", {
          scrollTop: this.scrollTop,
          isFixed: data.fixed || this.data.fixed
        });
      });
    },
    getContainerRect() {
      // 返回容器对应的 NodesRef 节点
      const nodeRef = this.properties.container();
      return new Promise((resolve) => {
        nodeRef.boundingClientRect(resolve).exec();
      });
    }
  }
});
