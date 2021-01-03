Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['custom-class'],
  properties: {
    icon: {
      type: String,
      require: true,
      value: '',
    },
    type: {
      type: String,
      value: 'default',
    },
    size: {
      type: String,
      value: '',
      observer: 'setStyle',
    },
    color: {
      type: String,
      observer: 'setStyle',
    },
  },
  data: {
    viewStyle: '',
  },
  methods: {
    setStyle() {
      let style = '';
      const { size, color } = this.properties;
      if (size) {
        style += `font-size:${size};`;
      }
      if (color) {
        style += `color:${color};`;
      }

      if (style !== this.data.viewStyle) {
        this.setData({ viewStyle: style });
      }
    },
  },
});
