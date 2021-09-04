import Schema from '../common/async-validator';

import FormControls from '../behaviors/form-controls';

Component({
  name: 'FormItem',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'label-class',
    'content-class',
    'errormsg-class'
  ],
  relations: {
    '../Form/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        // 从父组件Form获取数据并更新数据
        this.update();
      },
      unlinked() {
        this.parent = null;
      }
    },
    // 关联有FormControls这个behaviors的组件
    FormControls: {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: FormControls
    }
  },
  properties: {
    // 标签文本
    label: String,
    // 表单域 model 字段
    name: String,
    // 表单域标签的宽度
    labelWidth: {
      type: [String, Number]
    },
    // 表单域对齐方式
    flexDirection: {
      type: String,
      options: ['column', 'row']
    },
    // 表单验证规则
    rules: {
      type: Array,
      value: [],
      observer: 'updateRules'
    },
    // 是否隐藏 `*` 号
    hideRequiredAsterisk: {
      type: Boolean,
      value: false,
      observer: 'updateChildren'
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      value: true,
      observer: 'updateChildren'
    }
  },
  data: {
    // 错误信息
    errorMessage: '',
    // 标签文本宽度
    width: '',
    // 表单域对齐方式
    direction: '',
    // 是否需要显示 `*` 号
    required: false,
    // 校验规则
    rulesList: []
  },
  methods: {
    // 更新校验规则
    updateRules() {
      let parentRules = [];
      if (this.parent) {
        // 获取父组件Form对应的校验规则
        const { rules = {} } = this.parent.properties;
        const { name } = this.properties;
        parentRules = rules[name] || [];
      }

      const { rules: childRules = [] } = this.properties;
      // 合并父组件和子组件的校验规则
      this.setData({
        rulesList: [...parentRules, ...childRules]
      });
    },
    // 判断是否需要*号
    isRequired() {
      if (this.parent) {
        const rulesArr = this.data.rulesList;
        // 判断校验规则中是否存在required字段
        this.setData({
          required: rulesArr.some((rule) => rule.required)
        });
      }
    },
    // 从Form父组件中获取数据更新自己组件内部的数据
    update() {
      if (this.parent) {
        const { labelWidth, flexDirection } = this.parent.properties;
        this.setData({
          width: labelWidth,
          direction: flexDirection
        });
        // 合并规则
        this.updateRules();
        // 是否需要*号
        this.isRequired();
      }
    },
    // 根据触发类型过滤校验规则
    filterRules(triggerType = 'change') {
      let rulesArr = this.data.rulesList;
      if (triggerType) {
        rulesArr = rulesArr.filter((rule) => {
          if (rule.trigger) {
            return rule.trigger === triggerType;
          }
          // 规则中没有trigger字段的则默认是通过change触发的
          return triggerType === 'change';
        });
      }
      return rulesArr;
    },
    // 根据触发类型去触发校验
    checkValueByTrigger(triggerType) {
      const rulesArr = this.filterRules(triggerType);
      this.baseCheckValue(rulesArr);
    },
    // 直接触发校验，就是全部校验规则都触发一遍
    checkValue() {
      this.baseCheckValue(this.data.rulesList);
    },
    // 根据校验规则进行校验
    baseCheckValue(rulesList) {
      if (this.parent) {
        // 获取表单数据对象
        const { model = {} } = this.parent.properties;
        const { name } = this.properties;
        // 获取值
        const value = model[name];
        const schema = new Schema({ [name]: rulesList });
        return schema
          .validate({ [name]: value })
          .then(() => {
            // 校验成功
            this.parent.emitValidate({
              result: true,
              [name]: value
            });
            this.setData({ errorMessage: '' });
            return true;
          })
          .catch(({ fields }) => {
            // 校验失败
            this.parent.emitValidate({
              result: false,
              [name]: value,
              ...fields
            });
            this.setData({ errorMessage: fields[name][0].message });
            return false;
          });
      }
    },
    // 清空校验信息
    clearValidate() {
      this.setData({ errorMessage: '' });
    },
    // 触发change校验
    onChange() {
      return this.checkValueByTrigger('change');
    },
    // 触发blur校验
    onBlur() {
      return this.checkValueByTrigger('blur');
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    this.isRequired();
  },
  moved: function () {},
  detached: function () {}
});
