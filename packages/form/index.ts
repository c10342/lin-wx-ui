import { LinComponent } from "../common/component";
import { isFunction } from "../common/is.js";

LinComponent({
  mixins: ["footer-class"],
  relation: {
    type: "descendant",
    name: "form-item",
    linked() {
      this.updateChildren();
    }
  },
  props: {
    // 表单域标签的宽度
    labelWidth: {
      type: [String, Number],
      observer: "updateChildren"
    },
    // 表单域对齐方式
    flexDirection: {
      type: String,
      value: "row",
      options: ["column", "row"],
      observer: "updateChildren"
    },
    // 表单验证规则
    rules: {
      type: Object,
      value: {},
      observer: "updateChildren"
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
            (childItem) => childItem.data.name === key
          );
          if (child) {
            // 触发change事件校验
            child.checkValueByTrigger("change");
          }
        });
      }
    }
  },
  methods: {
    // 更新FormItem组件
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.update();
      });
    },
    // 校验表单
    checkValue(callback) {
      const { rules, model } = this.data;
      // 找出需要进行校验的FormItem组件
      const tasks = (this.children || [])
        .filter((child) => {
          const name = child.data.name;
          return name && rules[name];
        })
        .map((child) => child.checkValue());

      Promise.all(tasks)
        .then((res) => {
          // 执行回调函数
          if (isFunction(callback)) {
            callback(res.every(Boolean), model);
          }
        })
        .catch(() => {
          if (isFunction(callback)) {
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
      this.triggerEvent("validate", data);
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
    }
  },
  beforeCreate() {
    // 更新FormItem组件
    this.updateChildren();
  }
});
