import { LinComponent } from "../common/component";

LinComponent({
  classes: [
    "nav-class",
    "nav-item-class",
    "content-class",
    "content-item-class"
  ],
  props: {
    // 分类显示所需的数据
    items: {
      type: Array,
      value: [],
      observer: "updateSubItems"
    },
    // 左侧选中项的索引
    mainActiveIndex: {
      type: Number,
      value: 0,
      observer: "updateSubItems"
    },
    // 左侧显示文字的字段
    navLabelKey: {
      type: String,
      value: "text"
    },
    // 右侧显示文字的字段
    contentLabelKey: {
      type: String,
      value: "text"
    },
    // 右侧值的字段
    contentValueKey: {
      type: String,
      value: "id"
    },
    // 右侧选中项的值
    activeId: {
      type: null
    },
    // 右侧项最大选中个数
    max: {
      type: Number,
      value: Infinity
    },
    // 自定义右侧栏选中状态的图标
    selectedIcon: String,
    // 高度，默认单位为 px
    height: {
      type: [String, Number]
    }
  },
  data: {
    // 右侧选项数据
    subItems: []
  },
  methods: {
    // 左侧选中项的索引发生变化时触发
    updateSubItems() {
      const { items, mainActiveIndex } = this.data;
      // 找出对象选项数据
      const { children = [] } = items[mainActiveIndex] || {};
      this.setData({
        subItems: children
      });
    },
    // 点击左侧选项
    onNavClick(event) {
      // 找出点击的是第几个
      const { index } = event.currentTarget.dataset;
      const item = this.data.items[index];
      if (item.disabled) {
        return;
      }
      this.triggerEvent("nav-click", { index });
    },
    // 点击右侧的选项
    onItemClick(event) {
      const { item } = event.currentTarget.dataset;
      if (item.disabled) {
        return;
      }
      const { activeId, contentValueKey, max } = this.data;
      // 判断右侧选中项的值是否为数组（单选和多选区别）
      const isArray = Array.isArray(activeId);
      // 判断是否超出最大选中个数
      const isOverMax = isArray && activeId.length >= max;
      // 判断是否选中
      const isSelect = isArray
        ? activeId.indexOf(item[contentValueKey]) > -1
        : activeId === item[contentValueKey];
      // 没有超出最大选项总数，则可以被选中
      // 超出了最大选项总数，但是状态是从选中变成取消选种，这时候可以进行取消选种，但是不能进行新增选种
      if (!isOverMax || isSelect) {
        this.triggerEvent("item-click", item);
      }
    }
  }
});
