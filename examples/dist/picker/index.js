import { LinComponent } from "../common/component";
import { isUndef } from "../common/is";
LinComponent({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: {
    // 对象数组，配置每一列显示的数据
    columns: {
      type: Array,
      value: []
    },
    // 选项高度
    itemHeight: {
      type: Number,
      value: 44
    },
    // 选项对象中，文字对应的 key
    textKey: {
      type: String,
      value: "text"
    },
    // 是否显示顶部栏
    showToolbar: Boolean,
    // 顶部栏标题
    title: String,
    // 确认按钮文字
    confirmButtonText: {
      type: String,
      value: "确认"
    },
    // 取消按钮文字
    cancelButtonText: {
      type: String,
      value: "取消"
    },
    // 顶部栏位置
    toolbarPosition: {
      type: String,
      value: "top",
      options: ["top", "bottom"]
    },
    // 可见的选项个数
    visibleItemCount: {
      type: Number,
      value: 6,
      observer: "updateTopVisible"
    },
    // 单列选择器的默认选中项索引
    defaultIndex: {
      type: Number,
      value: 0
    },
    // 是否显示加载状态
    loading: Boolean
  },
  data: {
    // 顶部可见个数
    topVisible: 2
  },
  methods: {
    // 判断是否为简单列，非对象数组，简单列只有一列
    isSimple() {
      const { columns } = this.data;
      return columns.length && !columns[0].values;
    },
    // 更新顶部可见个数
    updateTopVisible() {
      const { visibleItemCount } = this.data;
      // 顶部可见个数为可见选项个数的一半
      const topVisible = parseInt(visibleItemCount / 2 + "", 10) - 1;
      this.setData({
        topVisible
      });
    },
    // 列值发生变化
    onChange(event) {
      wx.nextTick(() => {
        if (this.isSimple()) {
          // 简单列，即只有单列
          this.triggerEvent("change", {
            picker: this,
            value: this.getColumnValue(0),
            index: this.getColumnIndex(0)
          });
        } else {
          // 多列
          this.triggerEvent("change", {
            picker: this,
            // 所有列选中的值
            value: this.getValues(),
            // 第几列发生变化
            index: event.currentTarget.dataset.index
          });
        }
      });
    },
    // 点击取消按钮
    onCancel() {
      this.emitByType("cancel");
    },
    // 点击确定按钮
    onConfirm() {
      this.emitByType("confirm");
    },
    emitByType(type) {
      if (this.isSimple()) {
        // 简单列，即单列
        this.triggerEvent(type, {
          // 选中的值
          value: this.getColumnValue(0),
          // 选中的索引值
          index: this.getColumnIndex(0)
        });
      } else {
        // 多列
        this.triggerEvent(type, {
          // 所有列选中的值
          value: this.getValues(),
          // 所有列选中的索引
          index: this.getIndexes()
        });
      }
    },
    // 获取对应列选中的值
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },
    // 获取对应列选中项的索引
    getColumnIndex(index) {
      const column = this.getColumn(index);
      return column ? column.data.currentIndex : "";
    },
    // 获取对应的子组件，存在index则返回对应的下标值组件，否则就是全部
    getColumn(index) {
      const children = this.selectAllComponents(".lin-picker-column");
      if (isUndef(index)) {
        return children;
      }
      return children[index];
    },
    // 获取所有列选中的值
    getValues() {
      const columns = this.getColumn();
      return columns.map((child) => child.getValue());
    },
    // 获取所有列选中值对应的索引
    getIndexes() {
      const columns = this.getColumn();
      return columns.map((child) => child.data.currentIndex);
    },
    // 设置对应列中所有选项
    setColumnValues(index, options) {
      // 获取对应的列
      const column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error("setColumnValues: 对应列不存在"));
      }
      // 对比传出的数据列表跟已经存在的数据列表是否相等
      const isSame =
        JSON.stringify(column.data.optionsList) === JSON.stringify(options);
      if (isSame) {
        // 相同则什么都不做
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        // 设置列数据
        column.setData(
          {
            optionsList: options
          },
          () => {
            // 设置完成之后，设置选中值
            column.setIndex(0);
            column.updateTranslateY();
            resolve();
          }
        );
      });
    },
    // 设置所有列选中的值
    setValues(values = []) {
      const stack = values.map((value, index) =>
        this.setColumnValues(index, value)
      );
      return Promise.all(stack);
    },
    // 设置对应列选中项的索引
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);
      if (column == null) {
        return Promise.reject(new Error("setColumnIndex: 对应列不存在"));
      }
      column.setIndex(optionIndex);
      return Promise.resolve();
    },
    // 设置所有列选中值对应的索引
    setIndexes(indexes = []) {
      const stack = indexes.map((optionIndex, columnIndex) =>
        this.setColumnIndex(columnIndex, optionIndex)
      );
      return Promise.all(stack);
    },
    // 设置对应列选中的值
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error("setColumnValue: 对应列不存在"));
      }
      column.setValue(value);
      return Promise.resolve();
    },
    // 获取对应列中所有选项
    getColumnValues(index) {
      const column = this.getColumn(index) || {};
      return column.data.optionsList;
    }
  },
  mounted() {
    // 更新顶部可见个数
    this.updateTopVisible();
  }
});
