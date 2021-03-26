const shapeValue = 'round';
Component({
  name: 'Radio',
  behaviors: ['wx://form-field'],
  externalClasses: ['custom-class', 'icon-class', 'label-class'],
  relations: {
    '../RadioGroup/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    // 是否使用 icon 插槽
    useIconSlot: Boolean,
    // 图标大小，默认单位为`px`
    iconSize: {
      type: [String, Number],
      value: '40rpx'
    },
    // 形状
    shape: {
      type: String,
      options: ['round', 'square'],
      value: shapeValue
    },
    // 选中状态颜色
    checkedColor: String,
    // 当前选中项的标识符
    value: {
      type: null
    },
    // 是否为禁用状态
    disabled: Boolean,
    // 标识符,存在RadioGroup父组件的时候有用
    name: {
      type: null
    },
    // 是否禁用文本内容点击
    labelDisabled: Boolean
  },
  observers: {
    // 设置选中跟没选中时的图标
    'value,shape': function (value, shape) {
      let iconName = shape;
      if (value) {
        iconName = `${iconName}-active`;
      }
      this.setData({
        iconName
      });
    }
  },
  data: {
    // 图标名
    iconName: shapeValue,
    // 父组件是否禁用
    parentDisabled: false
  },
  methods: {
    // 发射change事件
    emitChange (value) {
      const instance = this.parent || this;
      instance.triggerEvent('input', value);
      instance.triggerEvent('change', value);
    },
    // 点击图标
    onIconClick () {
      const { disabled } = this.properties;
      const { parentDisabled } = this.data;
      // 是否禁用
      if (!disabled && !parentDisabled) {
        this.emitChange(this.properties.name);
      }
    },
    // 点击文本
    onLabelClick () {
      const { disabled, labelDisabled } = this.properties;
      const { parentDisabled } = this.data;
      // 判断是否禁用
      if (!disabled && !labelDisabled && !parentDisabled) {
        this.emitChange(this.properties.name);
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
