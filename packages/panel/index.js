Component({
  name: 'Panel',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'header-class',
    'content-class',
    'footer-class'
  ],
  properties: {
    // 标题
    title: String,
    // 描述
    desc: String,
    // 状态
    status: String,
    // 是否使用 footer slot
    useFooterSlot: Boolean
  },
  data: {},
  methods: {},
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
