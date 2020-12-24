Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    "custom-class",
    "active-class",
    "toolbar-class",
    "column-class",
  ],
  properties: {
    columns: {
      type: Array,
      value: [],
    },
    itemHeight: {
      type: Number,
      value: 44,
    },
    valueKey: {
      type: String,
      value: "text",
    },
    showToolbar: Boolean,
    title: String,
    confirmButtonText: {
      type: String,
      value: "确认",
    },
    cancelButtonText: {
      type: String,
      value: "取消",
    },
    toolbarPosition: {
      type: String,
      value: "top",
      options: ["top", "bottom"],
    },
    visibleItemCount: {
      type: Number,
      value: 6,
      observer: "updateTopVisible",
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
    loading: Boolean,
  },
  data: {
    topVisible: 2,
  },
  methods: {
    isSimple() {
      const { columns } = this.properties;
      return columns.length && !columns[0].values;
    },
    updateTopVisible() {
      const { visibleItemCount } = this.properties;
      const topVisible = parseInt(visibleItemCount / 2) - 1;
      this.setData({
        topVisible,
      });
    },
    onChange(event) {
      wx.nextTick(() => {
        if (this.isSimple()) {
          this.triggerEvent("change", {
            picker: this,
            value: this.getColumnValue(0),
            index: this.getColumnIndex(0),
          });
        } else {
          this.triggerEvent("change", {
            picker: this,
            value: this.getValues(),
            index: event.currentTarget.dataset.index,
          });
        }
      });
    },
    onCancel() {
      this.emitByType("cancel");
    },
    onConfirm() {
      this.emitByType("confirm");
    },
    emitByType(type) {
      if (this.isSimple()) {
        this.triggerEvent(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0),
        });
      } else {
        this.triggerEvent(type, {
          value: this.getValues(),
          index: this.getIndexes(),
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
    getColumn(index) {
      const children = this.selectAllComponents(".lin-picker-column");
      if (index == null || index == undefined) {
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
      const column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error("setColumnValues: 对应列不存在"));
      }
      const isSame =
        JSON.stringify(column.data.optionsList) === JSON.stringify(options);
      if (isSame) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        column.setData(
          {
            optionsList: options,
          },
          () => {
            column.setIndex(0);
            column.updateTranslateY();
            resolve();
          }
        );
      });
    },
    // 设置所有列选中的值
    setValues(values = []) {
      const stack = values.map((value, index) => {
        return this.setColumnValues(index, value);
      });
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
      const stack = indexes.map((optionIndex, columnIndex) => {
        return this.setColumnIndex(columnIndex, optionIndex);
      });
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
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.updateTopVisible();
  },
  moved: function() {},
  detached: function() {},
});
