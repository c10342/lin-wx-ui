import { LinComponent } from "../common/component";

LinComponent({
  relation: {
    type: "ancestor",
    name: "sidebar",
    linked() {
      this.updateFromParent();
    }
  },
  classes: ["content-class"],
  props: {
    // 内容
    title: String,
    // 是否显示右上角小红点
    dot: Boolean,
    // 图标右上角徽标的内容
    badge: {
      type: [String, Number],
      value: ""
    },
    // 是否禁用该项
    disabled: Boolean
  },
  data: {
    // 当前选中的索引
    activeKey: 0,
    // 该组件的索引号
    index: -1
  },
  methods: {
    // 从父组件哪里获取数据更新
    updateFromParent() {
      if (this.parent) {
        const { activeKey } = this.parent.data;
        this.setData({
          activeKey
        });
      }
    },
    // 设置组件索引号
    setIndex(index) {
      this.setData({ index });
    },
    // 点击选项
    onItemClick() {
      const { disabled } = this.data;
      if (this.parent && !disabled) {
        this.parent.emitChange(this.data.index);
      }
    }
  }
});
