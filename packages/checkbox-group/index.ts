import { LinComponent } from "../common/component";

LinComponent({
  field: true,
  relation: {
    type: "descendant",
    name: "checkbox",
    linked(child) {
      this.updateChild(child);
    }
  },
  props: {
    // 所有选中项的 name
    value: {
      type: Array,
      observer: "updateChildren"
    },
    // 是否禁用所有单选框
    disabled: {
      type: Boolean,
      observer: "updateChildren"
    },
    // 设置最大可选数
    max: Number,
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
    // 更新孩子（Checkbox）的属性
    updateChildren() {
      (this.children || []).forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled } = this.data;
      child.setData({
        // 设置孩子的value值，Boolean
        value: value.indexOf(child.data.name) !== -1,
        // 是否禁用
        parentDisabled: disabled
      });
    },
    // 发射事件
    emitChange(value) {
      this.triggerEvent("change", value);
    }
  }
});
