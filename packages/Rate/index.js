//Component Object
Component({
  properties: {
    gutter: {
      type: String,
      value: "4px",
    },
    color: {
      type: String,
      value: "#c8c9cc",
    },
    voidColor: {
      type: String,
      value: "#ee0a24",
    },
    allowHalf: Boolean,
    iconSize: {
      type: String,
      value: "60rpx",
    },
    value: {
      type: Number,
      observer: "setWidth",
    },
  },
  data: {
    innerCountArray: Array.from({ length: 6 }),
    width: "0",
  },
  methods: {
    setWidth() {
      let { value, allowHalf, gutter } = this.properties;
      gutter = parseFloat(gutter);
      const { innerCountArray } = this.data;
      const rateWidth = this.rateWidth;
      if (!rateWidth) {
        return;
      }
      let width = 0;
      if (value > innerCountArray.length) {
        value = innerCountArray.length;
      }
      if (value < 0) {
        value = 0;
      }
      //   if (allowHalf) {
      const inNum = Math.floor(value);
      let gutterWidth = Math.ceil(value - 1) * gutter;
      gutterWidth = gutterWidth < 0 ? 0 : gutterWidth;
      width = inNum * rateWidth + gutterWidth + (value - inNum) * rateWidth;
      //   } else {
      //     let gutterWidth = (value - 1) * gutter;
      //     gutterWidth = gutterWidth < 0 ? 0 : gutterWidth;
      //     width = value * rateWidth + gutterWidth;
      //   }
      this.setData({
        width: `${width}px`,
      });
    },
    onClick(event) {
      let { gutter, allowHalf } = this.properties;
      gutter = parseFloat(gutter);
      let index = event.currentTarget.dataset.index;
      const rateWidth = this.rateWidth;
      let width = 0;
      if (allowHalf) {
        const offsetLeft = event.currentTarget.offsetLeft;
        const x = event.detail.x;
        const diffx = x - offsetLeft;

        if (diffx > rateWidth) {
          width = (index + 1) * rateWidth + index * gutter;
        } else {
          width = (index + 1) * rateWidth + index * gutter - rateWidth / 2;
        }
      } else {
        width = (index + 1) * rateWidth + index * gutter;
      }

      this.setData({
        width: `${width}px`,
      });
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    const query = this.createSelectorQuery();
    query.select("#lin-rate-0").boundingClientRect();
    query.exec((res) => {
      this.rateWidth = res[0].width;
      this.setWidth();
    });
  },
  moved: function () {},
  detached: function () {},
});
