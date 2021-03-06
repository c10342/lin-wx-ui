
import { addUnit } from '../common/utils';
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class'],
  properties: {
    icon: {
      type: String,
      require: true,
      value: ''
    },
    type: {
      type: String,
      value: 'default',
      options: ['default', 'primary', 'info', 'warning', 'danger', 'success']
    },
    size: {
      type: [String, Number],
      value: '',
      observer: 'setStyle'
    },
    color: {
      type: String,
      observer: 'setStyle'
    }
  },
  data: {
    viewStyle: ''
  },
  methods: {
    setStyle () {
      let style = '';
      const { size, color } = this.properties;
      if (size) {
        style += `font-size:${addUnit(size)};`;
      }
      if (color) {
        style += `color:${color};`;
      }

      if (style !== this.data.viewStyle) {
        this.setData({ viewStyle: style });
      }
    }
  }
});
