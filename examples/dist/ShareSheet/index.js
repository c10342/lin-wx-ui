Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    show: Boolean,
    maskStyle: String,
    zIndex: {
      type: Number,
      value: 100,
    },
    title: String,
    cancelText: {
      type: String,
      value: '取消',
    },
    description: String,
    options: {
      type: Array,
      value: [],
    },
    mask: {
      type: Boolean,
      value: true,
    },
    closeOnClickMask: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 300,
    },
  },
  data: {},
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onCancel() {
      this.onClose();
      this.triggerEvent('cancel');
    },
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
