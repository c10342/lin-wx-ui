Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    'custom-class',
    'options-class',
    'option-class',
    'button-class',
    'image-class',
    'icon-class',
    'name-class',
    'description-class',
  ],
  properties: {
    // 分享选项
    options: {
      type: Array,
      value: [],
    },
    // 是否显示边框
    showBorder: Boolean,
  },
  data: {},
  methods: {
    // 点击选项
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const option = this.properties.options[index];
      this.triggerEvent('select', { ...option, index });
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
