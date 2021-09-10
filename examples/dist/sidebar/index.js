import { LinComponent } from "../common/component";
LinComponent({
  relation: {
    type: "descendant",
    name: "sidebar-item",
    linked() {
      this.updateChildren();
    },
    unlinked() {
      this.updateChildren();
    }
  },
  props: {
    // 选中项的索引
    activeKey: {
      type: [String, Number],
      value: 0,
      observer: "updateChildren"
    }
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child, index) => {
        // 更新子组件数据
        child.updateFromParent();
        // 设置子组件的索引
        child.setIndex(index);
      });
    },
    emitChange(index) {
      this.triggerEvent("change", index);
    }
  }
});
