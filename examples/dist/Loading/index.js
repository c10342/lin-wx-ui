// Component Object
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class', 'text-class', 'loading-class'],
  properties: {
    text: String,
    type: {
      type: String,
      value: 'primary',
      options: ['primary', 'success', 'info', 'warning', 'danger']
    },
    size: {
      type: String,
      observer: 'setLoadingStyle'
    },
    color: {
      type: String,
      observer: 'setLoadingStyle'
    },
    textColor: {
      type: String,
      observer: 'setTextStyle'
    },
    textSize: {
      type: String,
      observer: 'setTextStyle'
    },
    time: {
      type: String,
      observer: 'setLoadingStyle'
    },
    vertical: {
      type: String,
      options: ['row', 'col'],
      value: 'row'
    }
  },
  data: {
    loadingStyle: '',
    textStyle: ''
  },
  methods: {
    setLoadingStyle () {
      let style = '';
      const { size, time, color } = this.properties;
      if (size) {
        style += `width:${size};height:${size};`;
      }
      if (time) {
        style += `animation-duration:${time};`;
      }
      if (color) {
        style += `border-right-color:${color};`;
        style += `border-top-color:${color};`;
        style += `border-bottom-color:${color};`;
      }
      if (style !== this.data.loadingStyle) {
        this.setData({ loadingStyle: style });
      }
    },
    setTextStyle () {
      let style = '';
      const { textColor, textSize } = this.properties;
      if (textColor) {
        style += `color:${textColor};`;
      }
      if (textSize) {
        style += `font-size:${textSize};`;
      }
      if (style !== this.data.textStyle) {
        this.setData({ textStyle: style });
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
