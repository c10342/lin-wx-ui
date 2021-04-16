// Component Object
Component({
  name: 'CheckboxGroup',
  options: {
    addGlobalClass: true
  },
  behaviors: ['wx://form-field'],
  externalClasses: ['custom-class'],
  relations: {
    '../Checkbox/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChild(child);
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
      }
    }
  },
  properties: {
    // 所有选中项的 name
    value: {
      type: Array,
      observer: 'updateChildren'
    },
    // 是否禁用所有单选框
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    // 设置最大可选数
    max: Number,
    // 在表单内提交时的标识符
    name: String,
    // 选项排版方向
    direction: {
      type: String,
      value: 'column',
      options: ['column', 'row']
    }
  },
  data: {},
  methods: {
    // 更新孩子（Checkbox）的属性
    updateChildren() {
      (this.children || []).forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled } = this.properties;
      child.setData({
        // 设置孩子的value值，Boolean
        value: value.indexOf(child.data.name) !== -1,
        // 是否禁用
        parentDisabled: disabled
      });
    },
    // 发射事件
    emitChange(value) {
      this.triggerEvent('change', value);
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
