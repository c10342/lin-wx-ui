// Component Object
Component({
  name: 'Row',
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../Col/index': {
      type: 'descendant',
      linked(target) {
        if (this.properties.gutter) {
          target.setGutter(this.properties.gutter);
        }
      },
    },
  },
  properties: {
    // 列元素之间的间距（单位为 px）
    gutter: {
      type: Number,
      observer: 'setGutter',
    },
  },
  data: {
    // 根节点样式
    viewStyle: '',
  },
  methods: {
    setGutter() {
      const { gutter } = this.properties;
      const margin = `-${Number(gutter) / 2}px`;
      if (gutter) {
        // 设置margin外边距
        const viewStyle = `margin-right: ${margin}; margin-left: ${margin};`;
        this.setData({ viewStyle });
      }
      // 设置Col组件的padding内边距
      this.getRelationNodes('../Col/index').forEach((col) => {
        col.setGutter(gutter);
      });
    },
  },
  created() {},
  attached() {},
  ready() {
    if (this.properties.gutter) {
      this.setGutter();
    }
  },
  moved() {},
  detached() {},
});
