import { LinComponent } from "../common/component";
LinComponent({
  relation: {
    type: "descendant",
    name: "grid-item",
    linked() {
      // 更新GridItem组件
      this.updateChildren();
    },
    unlinked() {
      this.updateChildren();
    }
  },
  props: {
    // 列数
    columnNum: {
      type: Number,
      value: 4,
      observer: "updateChildren"
    },
    // 图标大小，默认单位为 px
    iconSize: {
      type: [String, Number],
      value: "56rpx",
      observer: "updateChildren"
    },
    // 格子之间的间距，默认单位为 px
    gutter: {
      type: [String, Number],
      value: 0,
      observer: "updateChildren"
    },
    // 是否显示边框
    border: {
      type: Boolean,
      value: true,
      observer: "updateChildren"
    },
    // 是否将格子内容居中显示
    center: {
      type: Boolean,
      value: true,
      observer: "updateChildren"
    },
    // 是否将格子固定为正方形
    square: {
      type: Boolean,
      observer: "updateChildren"
    },
    // 格子内容排列的方向
    direction: {
      type: String,
      value: "vertical",
      options: ["vertical", "horizontal"],
      observer: "updateChildren"
    }
  },
  methods: {
    // 更新GridItem组件
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateStyle();
      });
    }
  }
});
