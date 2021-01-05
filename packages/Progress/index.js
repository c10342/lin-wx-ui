Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'portion-class', 'pivot-class'],
  properties: {
    inactive: {
      type: Boolean,
      value: false
    },
    percentage: {
      type: Number,
      value: 0,
      observer: 'setProgressWidth'
    },
    strokeWidth: {
      type: [String, Number]
    },
    showPivot: {
      type: Boolean,
      value: true
    },
    color: String,
    textColor: String,
    trackColor: String,
    pivotText: {
      type: String,
      value: '',
      observer: 'setProgressWidth'
    },
    pivotColor: String
  },
  data: {
    progressWidth: '0px',
    pivotRight: '0px',
    grayColor: 'rgb(202, 202, 202)'
  },
  methods: {
    setProgressWidth () {
      let { percentage } = this.properties;
      if (percentage <= 0) {
        percentage = 0;
      } else if (percentage >= 100) {
        percentage = 100;
      }
      const offsetWidth = this.progressWidth * (percentage / 100);
      this.setData({ progressWidth: `${offsetWidth}px` });
      wx.nextTick(async () => {
        const { width: pivotWidth } = await this.getWidth(
          '.lin-progress-pivot'
        );
        let pivotRight = 0;
        if (offsetWidth + pivotWidth / 2 >= this.progressWidth) {
          pivotRight = 0;
        } else if (offsetWidth <= pivotWidth / 2) {
          pivotRight = offsetWidth - pivotWidth;
        } else {
          pivotRight = -(pivotWidth / 2);
        }
        this.setData({
          pivotRight: `${pivotRight}px`
        });
      });
    },
    getWidth (dom) {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query.select(dom).boundingClientRect();
        query.exec((rect) => {
          resolve(rect[0]);
        });
      });
    }
  },
  created () {
    this.progressWidth = 0;
  },
  attached () {},
  ready () {
    this.getWidth('.lin-progress').then((res) => {
      this.progressWidth = res.width;
      this.setProgressWidth();
    });
  },
  moved () {},
  detached () {}
});
