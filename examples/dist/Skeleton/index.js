Component({
  name: 'Skeleton',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'avatar-class',
    'title-class',
    'row-class',
    'slot-class'
  ],
  properties: {
    // 段落占位图行数
    row: {
      type: Number,
      value: 0,
      observer (newVal) {
        this.setData({
          rowArray: Array.from({ length: newVal })
        });
      }
    },
    // 段落占位图宽度，可传数组来设置每一行的宽度
    rowWidth: {
      type: [String, Array],
      observer (newVal) {
        this.setData({
          isArray: newVal instanceof Array
        });
      }
    },
    // 是否显示标题占位图
    title: {
      type: Boolean,
      value: false
    },
    // 标题占位图宽度
    titleWidth: {
      type: [String, Number]
    },
    // 是否显示头像占位图
    avatar: {
      type: Boolean,
      value: false
    },
    // 头像占位图大小
    avatarSize: {
      type: [String, Number]
    },
    // 头像占位图形状
    avatarShape: {
      type: String,
      value: 'round',
      options: ['round', 'square']
    },
    // 是否显示占位图，传false时会展示子组件内容
    loading: {
      type: Boolean,
      value: true
    },
    // 是否开启动画
    animate: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 段落行数
    rowArray: [],
    // rowWidth是否是数组
    isArray: false
  },
  methods: {},
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
