import { LinComponent } from "../common/component";

import { getRect } from "../common/utils";

LinComponent({
  relation: {
    type: "descendant",
    name: "water-flow-item",
    linked() {
      this.renderWaterFlow();
    },
    unlinked() {
      this.renderWaterFlow();
    }
  },
  props: {
    // 需要监听的数据变化，数据变化的时候会自动进行排版
    watchData: {
      type: Array,
      value: [],
      observer: "renderWaterFlow"
    },
    // 垂直边距
    verticalMargin: {
      type: Number,
      value: 20,
      observer: "renderWaterFlow"
    },
    // 水平边距
    horizontalMargin: {
      type: Number,
      value: 10,
      observer: "renderWaterFlow"
    }
  },
  data: {
    // 组件总宽度
    height: 0
  },
  methods: {
    // 计算子组件WaterFlowItem位置
    renderWaterFlow() {
      getRect(this, ".lin-water-flow").then((rect) => {
        // 设置子组件的宽度
        this.setChildWidth(rect);
        // 设置子组件的位置
        this.setChildrenPosition();
      });
    },
    // 设置子组件的宽度
    setChildWidth(parentContainer) {
      // 水平间距
      const { horizontalMargin } = this.data;
      const width = parentContainer.width / 2 - horizontalMargin;
      (this.children || []).forEach((child) => {
        child.setWidth(width);
      });
    },
    // 设置子组件位置
    setChildrenPosition() {
      wx.nextTick(() => {
        // 获取水平边距和垂直边距
        const { verticalMargin, horizontalMargin } = this.data;
        // 瀑布流分2栏
        // 左侧高度
        let leftHeight = 0;
        // 右侧高度
        let rightHeight = 0;
        // 任务队列
        const tasks: Promise<WechatMiniprogram.BoundingClientRectCallbackResult>[] = [];
        (this.children || []).forEach((child) => {
          // 获取子组件元素信息
          tasks.push(child.getRect());
        });
        Promise.all(tasks).then((result) => {
          result.forEach((res, index) => {
            const child = this.children[index];
            // 找出左右2边高度比较小的，往高度小的下面填充
            if (leftHeight <= rightHeight) {
              child.setPosition(
                `left:${horizontalMargin / 2}px;top:${leftHeight}px;`
              );
              // 叠加高度
              leftHeight += res.height + verticalMargin * 1;
            } else {
              child.setPosition(
                `right:${horizontalMargin / 2}px;top:${rightHeight}px;`
              );
              // 叠加高度
              rightHeight += res.height + verticalMargin * 1;
            }
          });
          // 左右2边高度最大的为组件的高度
          this.setData({
            height:
              Math.ceil(Math.max(leftHeight, rightHeight)) - verticalMargin * 1
          });
        });
      });
    }
  }
});
