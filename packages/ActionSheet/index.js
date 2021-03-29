import OpenTypeBehavior from '../behaviors/open-type';

Component({
  // 组件名
  name: 'ActionSheet',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  behaviors: [OpenTypeBehavior],
  externalClasses: [
    'custom-class',
    'title-class',
    'description-class',
    'actions-wrapper-class',
    'button-class',
    'cancelText-class',
  ],
  properties: {
    // 是否显示
    show: Boolean,
    // 菜单选项
    actions: {
      type: Array,
      value: [],
    },
    // 是否显示圆角
    round: {
      type: Boolean,
      value: true,
    },
    // 是否在点击选项后关闭
    closeOnClickAction: {
      type: Boolean,
      value: true,
    },
    // 点击遮罩是否关闭菜单
    closeOnClickMask: {
      type: Boolean,
      value: true,
    },
    // 取消按钮文字
    cancelText: String,
    // 选项上方的描述信息
    description: String,
    // 标题
    title: String,
    // 是否显示关闭按钮
    showCloseIcon: {
      type: Boolean,
      value: true,
    },
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100,
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true,
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {},
  methods: {
    // 点击选项
    onSelect(event) {
      const { actions, closeOnClickAction } = this.properties;
      // 找出点击的是第几个选项
      const { index } = event.currentTarget.dataset;
      const item = actions[index];
      if (item && !item.disabled && !item.loading) {
        // 触发事件
        this.triggerEvent('select', item);
        if (closeOnClickAction) {
          // 关闭弹框
          this.onClose();
        }
      }
    },
    // 点击取消
    onCancel() {
      this.triggerEvent('cancel');
    },
    // 点击关闭按钮
    onClose() {
      this.triggerEvent('close');
    },
    // 点击遮罩层
    onClickMask() {
      this.triggerEvent('mask-click');
      this.onClose();
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
