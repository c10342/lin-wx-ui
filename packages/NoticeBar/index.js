Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'left-icon-class',
    'wrapper-class',
    'content-class',
    'close-icon-class',
    'navigator-class'
  ],
  properties: {
    mode: {
      type: String,
      options: ['closeable', 'link']
    },
    text: {
      type: String,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    color: String,
    background: String,
    leftIcon: String,
    delay: {
      type: Number,
      value: 0,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    speed: {
      type: Number,
      value: 50,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    wrapable: Boolean,
    openType: {
      type: String,
      value: 'navigate'
    },
    url: String
  },
  data: {
    contentStyle: '',
    show: true
  },
  methods: {
    updateStyle () {
      const { scrollable, speed, delay } = this.properties;
      if (scrollable) {
        const query = this.createSelectorQuery();
        query.select('#bar-content').boundingClientRect();
        query.select('#bar-wrapper').boundingClientRect();
        query.exec((rect) => {
          const contentWidth = rect[0].width || 0;
          const wrapperWidth = rect[1].width || 0;
          const duration = Math.floor(contentWidth / speed);
          const contentStyle = `transform: translateX(${Math.ceil(
            wrapperWidth
          )}px);animation-duration:${duration}s;animation-delay:${delay}s;`;
          if (contentStyle !== this.data.contentStyle) {
            this.setData({ contentStyle });
          }
        });
      } else {
        const contentStyle = 'animation: none;';
        if (contentStyle !== this.data.contentStyle) {
          this.setData({ contentStyle });
        }
      }
    },
    onClick (event) {
      this.triggerEvent('click', event);
    },
    onClickIcon (event) {
      if (this.properties.mode === 'closeable') {
        this.setData({ show: false });
        this.triggerEvent('close', event);
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
