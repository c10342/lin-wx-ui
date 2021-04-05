Component({
  name: 'Grid',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../GridItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        // 更新GridItem组件
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      },
    },
  },
  properties: {
    // 列数
    columnNum: {
      type: Number,
      value: 4,
      observer: 'updateChildren',
    },
    // 图标大小，默认单位为 px
    iconSize: {
      type: [String, Number],
      value: '56rpx',
      observer: 'updateChildren',
    },
    // 格子之间的间距，默认单位为 px
    gutter: {
      type: [String, Number],
      value: 0,
      observer: 'updateChildren',
    },
    // 是否显示边框
    border: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    // 是否将格子内容居中显示
    center: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    // 是否将格子固定为正方形
    square: {
      type: Boolean,
      observer: 'updateChildren',
    },
    // 格子内容排列的方向
    direction: {
      type: String,
      value: 'vertical',
      options: ['vertical', 'horizontal'],
      observer: 'updateChildren',
    },
  },
  data: {},
  methods: {
    // 更新GridItem组件
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateStyle();
      });
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
