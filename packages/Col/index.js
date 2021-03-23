// Component Object
Component({
  name: 'Col',
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  relations: {
    '../Row/index': {
      type: 'ancestor'
    }
  },
  properties: {
    // 列元素宽度
    span: Number,
    // 列元素偏移距离
    offset: Number
  },
  data: {
    // 根节点样式
    viewStyle: ''
  },
  methods: {
    setGutter (gutter) {
      // 设置左右padding边距
      const padding = `${gutter / 2}px`;
      const viewStyle = gutter
        ? `padding-left: ${padding}; padding-right: ${padding};`
        : '';
      if (viewStyle !== this.data.viewStyle) {
        this.setData({ viewStyle });
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
