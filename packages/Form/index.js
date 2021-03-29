Component({
  name: 'Form',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class', 'footer-class'],
  relations: {
    '../FormItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
      },
    },
  },
  properties: {
    // 表单域标签的宽度
    labelWidth: {
      type: [String, Number],
      observer: 'updateChildren',
    },
    // 表单域对齐方式
    flexDirection: {
      type: String,
      value: 'row',
      options: ['column', 'row'],
      observer: 'updateChildren',
    },
    // 表单验证规则
    rules: {
      type: Object,
      value: {},
      observer: 'updateChildren',
    },
    // 表单数据对象
    model: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        // 找出发生变化的数据
        const diffData = this.findDiffData(newVal, oldVal);
        Object.keys(diffData).forEach((key) => {
          // 找出对应的FormItem组件
          const child = (this.children || []).find(
            (childItem) => childItem.properties.name === key
          );
          if (child) {
            // 触发change事件校验
            child.checkValueByTrigger('change');
          }
        });
      },
    },
  },
  data: {},
  methods: {
    // 更新FormItem组件
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.update();
      });
    },
    // 校验表单
    checkValue(callback) {
      const { rules, model } = this.properties;
      // 找出需要进行校验的FormItem组件
      const tasks = (this.children || [])
        .filter((child) => {
          const name = child.properties.name;
          return name && rules[name];
        })
        .map((child) => child.checkValue());

      Promise.all(tasks)
        .then((res) => {
          // 执行回调函数
          if (typeof callback === 'function') {
            callback(res.every(Boolean), model);
          }
        })
        .catch(() => {
          if (typeof callback === 'function') {
            callback(false, model);
          }
        });
    },
    // 清空校验
    clearValidate() {
      (this.children || []).forEach((child) => {
        child.clearValidate();
      });
    },
    // 发射校验事件
    emitValidate(data) {
      this.triggerEvent('validate', data);
    },
    // 找出发生变化的数据
    findDiffData(newVal, oldVal) {
      const diffData = {};
      Object.keys(newVal).forEach((key) => {
        if (JSON.stringify(newVal[key]) !== JSON.stringify(oldVal[key])) {
          diffData[key] = newVal[key];
        }
      });
      return diffData;
    },
  },
  created: function () {
    // 更新FormItem组件
    this.updateChildren();
  },
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
