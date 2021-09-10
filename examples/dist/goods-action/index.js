import { LinComponent } from "../common/component";
LinComponent({
  relation: {
    type: "descendant",
    name: "goods-action-button",
    linked() {
      // 更新GoodsActionButton组件数据
      this.updateChildren();
    },
    unlinked() {
      this.updateChildren();
    }
  },
  props: {
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    // 更新GoodsActionButton组件数据
    updateChildren() {
      const children = this.children || [];
      const len = children.length;
      children.forEach((child, index) => {
        child.update(index, len);
      });
    }
  }
});
