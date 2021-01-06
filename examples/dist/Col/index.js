// Component Object
Component({
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
    span: Number,
    offset: Number
  },
  data: {
    viewStyle: ''
  },
  methods: {
    setGutter (gutter) {
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
