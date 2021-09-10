import { LinComponent } from "../common/component";
LinComponent({
  field: true,
  relation: {
    type: "descendant",
    name: "radio",
    linked(child) {
      this.updateChild(child);
    }
  },
  props: {
    // 当前选中项的标识符
    value: {
      type: null,
      observer: "updateChildren"
    },
    // 是否禁用所有单选框
    disabled: {
      type: Boolean,
      observer: "updateChildren"
    },
    // 在表单内提交时的标识符
    name: String,
    // 选项排版方向
    direction: {
      type: String,
      value: "column",
      options: ["column", "row"]
    }
  },
  methods: {
    // 更新单个子组件
    updateChild(child) {
      const { value, disabled } = this.data;
      child.setData({
        // 判断是否选中
        value: value === child.data.name,
        parentDisabled: disabled
      });
    },
    // 更新子组件
    updateChildren() {
      (this.children || []).forEach((child) => this.updateChild(child));
    }
  }
});
