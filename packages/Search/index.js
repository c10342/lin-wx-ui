
import FormControls from '../behaviors/form-controls';
Component({
  name: 'Search',
  behaviors: ['wx://form-field', FormControls],
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'input-class',
    'field-class',
    'cancel-class'
  ],
  properties: {
    // 搜索框左侧文本
    label: String,
    // 是否使用输入框左侧图标 slot
    useLeftIconSlot: Boolean,
    // 是否使用输入框右侧图标 slot
    useRightIconSlot: Boolean,
    // 输入框左侧图标名称（如果设置了 use-left-icon-slot，则该属性无效）
    leftIcon: {
      type: String,
      value: 'search'
    },
    // 输入框右侧图标名称（如果设置了 use-right-icon-slot，则该属性无效）
    rightIcon: String,
    // 获取焦点
    focus: Boolean,
    // 当前输入的值
    value: String,
    // 是否禁用输入框
    disabled: Boolean,
    // 是否只读
    readonly: Boolean,
    // 是否启用清除控件
    clearable: Boolean,
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: Number,
      value: -1
    },
    // 输入框内容对齐方式
    inputAlign: {
      type: String,
      options: ['left', 'center', 'right']
    },
    // 输入框为空时占位符
    placeholder: String,
    // 指定占位符的样式
    placeholderStyle: String,
    // 是否在搜索框右侧显示取消按钮
    showAction: Boolean,
    // 是否使用 action slot
    useActionSlot: Boolean,
    // 取消按钮文字
    actionText: {
      type: String,
      value: '取消'
    },
    // 搜索框背景色
    background: String,
    // 形状
    shape: {
      type: String,
      value: 'square',
      options: ['square', 'round']
    },
    // 在表单内提交时的标识符
    name: String
  },
  data: {},
  methods: {
    emitChange (data) {
      this.triggerEvent('change', data);
    },
    // 输入框change事件
    onChange (event) {
      this.emitChange(event.detail);
    },
    // 点击取消按钮
    onCancel () {
      this.triggerEvent('cancel');
      this.emitChange('');
    },
    // 点击搜索按钮
    onSearch (event) {
      this.triggerEvent('search', event.detail);
    },
    // 输入框聚焦
    onFocus (event) {
      this.triggerEvent('focus', event.detail);
    },
    // 输入框失去焦点
    onBlur (event) {
      this.triggerEvent('blur', event.detail);
      // 触发FormItem组件的方法
      this.triggerParentBlur(event.detail);
    },
    // 点击清空按钮
    onClear (event) {
      this.triggerEvent('clear', event.detail);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
