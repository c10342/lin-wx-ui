Component({
  name: 'RadioGroup',
  behaviors: ['wx://form-field'],
  externalClasses: ['custom-class'],
  relations: {
    '../Radio/index': {
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
    // 当前选中项的标识符
    value: {
      type: null,
      observer: 'updateChildren'
    },
    // 是否禁用所有单选框
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
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
    // 更新单个子组件
    updateChild(child) {
      const { value, disabled } = this.properties;
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
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
