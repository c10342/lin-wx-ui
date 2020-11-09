//Component Object
Component({
  behaviors: ["wx://form-field"],
  externalClasses: ["custom-class", "icon-class","void-icon-class"],
  options: {
    addGlobalClass: true,
  },
  properties: {
    gutter: {
      type: String,
      value: "4px",
    },
    color: {
      type: String,
      value: "#ee0a24",
    },
    voidColor: {
      type: String,
      value: "#c8c9cc",
    },
    allowHalf: Boolean,
    iconSize: {
      type: String,
      value: "50rpx",
    },
    value: {
      type: Number,
      observer: "setWidth",
    },
    count: {
      type: Number,
      value: 5,
      observer: "setCount",
    },
    icon: {
      type: String,
      value: "star1",
    },
    voidIcon: {
      type: String,
      value: "star1-o",
    },
    readonly: Boolean,
    disabled: Boolean,
    disabledColor: {
      type: String,
      value: "#bdbdbd",
    },
  },
  data: {
    innerCountArray: Array.from({ length: 5 }),
    width: "0",
  },
  methods: {
    setCount() {
      this.setData({
        innerCountArray: Array.from({ length: this.properties.count }),
      });
    },
    setWidth() {
      let { value, gutter } = this.properties;
      gutter = parseFloat(gutter);
      const { innerCountArray } = this.data;
      if (!this.rateWidth || !this.containerLeft) {
        return;
      }
      let width = 0;
      if (value > innerCountArray.length) {
        value = innerCountArray.length;
      }
      if (value < 0) {
        value = 0;
      }
      const inNum = Math.floor(value);
      let gutterWidth = Math.ceil(value - 1) * gutter;
      gutterWidth = gutterWidth < 0 ? 0 : gutterWidth;
      width =
        inNum * this.rateWidth + gutterWidth + (value - inNum) * this.rateWidth;

      this.setData({
        width: `${width}px`,
      });
    },
    onClick(event) {
      let { gutter, allowHalf, readonly, disabled } = this.properties;
      if (readonly || disabled) {
        return;
      }
      gutter = parseFloat(gutter);
      let index = event.currentTarget.dataset.index;
      if (allowHalf) {
        const offsetLeft = event.currentTarget.offsetLeft;
        const x = event.detail.x - this.containerLeft;
        const diffx = x - offsetLeft;

        if (diffx > this.rateWidth / 2) {
          index = index + 1;
        } else {
          index = index + 0.5;
        }
      } else {
        index = index + 1;
      }

      this.triggerEvent("change", index);
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.setCount();
    const query = this.createSelectorQuery();
    query.select("#lin-rate-0").boundingClientRect();
    query.select("#lin-rate-o").boundingClientRect();
    query.exec((res) => {
      this.rateWidth = res[0].width;
      this.containerLeft = res[1].left;
      this.setWidth();
    });
  },
  moved: function() {},
  detached: function() {},
});