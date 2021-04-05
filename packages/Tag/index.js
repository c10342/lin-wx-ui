Component({
  name: 'Tag',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    // 类型
    type: {
      type: String,
      value: 'primary',
      options: ['primary', 'success', 'danger', 'warning', 'info'],
    },
    // 大小
    size: {
      type: String,
      options: ['large', 'medium'],
    },
    // 标签颜色
    color: String,
    // 是否为空心样式
    plain: Boolean,
    // 是否为圆角样式
    round: Boolean,
    // 是否为标记样式
    mark: Boolean,
    // 文本颜色
    textColor: String,
    // 是否为可关闭标签
    closeable: Boolean,
  },
  data: {},
  methods: {
    onClick() {
      this.triggerEvent('close', false);
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
