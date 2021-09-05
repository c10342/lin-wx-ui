import { LinComponent } from "../common/component";

LinComponent({
  relation: {
    type: "descendant",
    name: "collapse-item"
  },
  props: {
    // 当前展开面板的 name
    value: {
      type: null,
      observer: "updateExpanded"
    },
    // 是否开启手风琴模式
    accordion: {
      type: Boolean,
      observer: "updateExpanded"
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    // 更新CollapseItem组件
    updateExpanded() {
      (this.children || []).forEach((child) => {
        child.updateExpanded();
      });
    },
    // 切换展开状态
    switch(currentName, expanded) {
      const { accordion, value } = this.data;
      // 保存切换的item的name值
      const changeItem = currentName;
      if (!accordion) {
        // 不是手风琴模式，就是可以同时打开多个，currentName是数组
        currentName = expanded
          ? (value || []).concat(currentName)
          : (value || []).filter((activeName) => activeName !== currentName);
      } else {
        // 手风琴模式
        currentName = expanded ? currentName : "";
      }
      if (expanded) {
        // 展开
        this.triggerEvent("open", changeItem);
      } else {
        // 关闭
        this.triggerEvent("close", changeItem);
      }
      this.triggerEvent("change", currentName);
    }
  }
});
