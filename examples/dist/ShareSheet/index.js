Component({
  name: 'ShareSheet',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    'custom-class',
    'header-class',
    'title-class',
    'description-class',
    'cancel-class',
    'item-custom-class',
    'item-options-class',
    'item-option-class',
    'item-button-class',
    'item-image-class',
    'item-icon-class',
    'item-name-class',
    'item-description-class',
  ],
  properties: {
    // 是否显示
    show: Boolean,
    // 遮罩层样式
    maskStyle: String,
    // z-index 层级
    zIndex: {
      type: Number,
      value: 100,
    },
    // 顶部标题
    title: String,
    // 取消按钮文字
    cancelText: {
      type: String,
      value: '取消',
    },
    // 标题下方的辅助描述文字
    description: String,
    // 分享选项
    options: {
      type: Array,
      value: [],
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true,
    },
    // 是否在点击遮罩层后关闭
    closeOnClickMask: {
      type: Boolean,
      value: true,
    },
    // 动画时长，单位毫秒
    duration: {
      type: Number,
      value: 300,
    },
  },
  data: {},
  methods: {
    // 点击关闭按钮
    onClose() {
      this.triggerEvent('close');
    },
    // 点击取消按钮
    onCancel() {
      this.onClose();
      this.triggerEvent('cancel');
    },
    // 点击选项
    onSelect(event) {
      this.triggerEvent('select', event.detail);
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
