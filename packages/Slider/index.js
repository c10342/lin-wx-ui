//Component Object
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    value: {
      type: Number,
      value: 0,
      observer: "setBarWidth",
    },
    disabled: Boolean,
    max: {
      type: Number,
      value: 100,
    },
    min: {
      type: Number,
      value: 0,
    },
    step: {
      type: Number,
      value: 1,
    },
    barHeight: {
      type: String,
      value: "2px",
    },
    activeColor: {
      type: String,
      value: "#1989fa",
    },
    inactiveColor: {
      type: String,
      value: "#e5e5e5",
    },
    useButtonSlot: Boolean,
  },
  data: {
    width: 0,
    left: 0,
    transition: "transition: all 300ms",
  },
  methods: {
    setBarWidth() {
      const offsetWidth = this.getOffsetWidthByValue(this.properties.value);
      this.setStyleWidth(offsetWidth);
    },
    getOffsetWidthByValue(value) {
      const { max, min } = this.properties;
      let offsetNum = max - min;
      let percent = 0;
      if (value >= max) {
        percent = 1;
      } else if (value < min) {
        percent = 0;
      } else {
        const leftNum = value - min;
        percent = leftNum / offsetNum;
      }
      return this.containerWidth * percent;
    },
    setStyleWidth(offsetWidth) {
      offsetWidth = parseInt(offsetWidth);
      let left = offsetWidth - this.barWidth / 2;
      if (left <= 0) {
        left = 0;
      }
      if (left >= this.containerWidth - this.barWidth) {
        left = this.containerWidth - this.barWidth;
      }
      this.setData({
        left: left,
        width: offsetWidth,
      });
    },
    onClick(event) {
      if (this.properties.disabled) {
        return;
      }
      const { step } = this.properties;
      const x = event.detail.x;
      let offsetWidth = x - this.containerLeft;
      let value = this.getValue(offsetWidth);
      const remainder = value % step;
      if (remainder != 0) {
        value = value - remainder;
        offsetWidth = Math.ceil(this.getOffsetWidthByValue(value));
      }
      this.setStyleWidth(offsetWidth);

      this.emitChange();
    },
    onTouchStart() {
      if (this.properties.disabled) {
        return;
      }
      this.setData({
        transition: "transition: none",
      });
      this.triggerEvent("drag-start");
    },
    onTouchMove(event) {
      if (this.properties.disabled) {
        return;
      }
      const clientX = event.touches[0].clientX;
      let offsetWidth = clientX - this.containerLeft;
      if (offsetWidth <= 0) {
        offsetWidth = 0;
      }
      if (offsetWidth >= this.containerWidth) {
        offsetWidth = this.containerWidth;
      }

      const { step } = this.properties;
      let value = this.getValue(offsetWidth);
      const remainder = value % step;
      if (remainder != 0) {
        return;
      }

      this.setStyleWidth(offsetWidth);
      this.emitDrag();
    },
    onTouchEnd() {
      if (this.properties.disabled) {
        return;
      }
      this.setData({
        transition: "transition: all 300ms",
      });
      this.emitChange();
      this.triggerEvent("drag-end");
    },
    getValue(offsetWidth) {
      const percent = offsetWidth / this.containerWidth;
      const { max, min } = this.properties;
      const offsetNum = max - min;
      const leftNum = offsetNum * percent;
      return parseInt(min + leftNum);
    },
    emitChange() {
      this.triggerEvent("change", this.getValue(this.data.width));
    },
    emitDrag() {
      this.triggerEvent("drag", this.getValue(this.data.width));
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.containerLeft = 0;
    this.containerWidth = 0;
    this.barWidth = 0;
    const query = this.createSelectorQuery();
    query.select("#linsliderContainer").boundingClientRect();
    query.select("#linSliderBar").boundingClientRect();
    query.exec((rect) => {
      this.containerLeft = rect[0].left;
      this.containerWidth = rect[0].width;
      this.barWidth = rect[1].width;
      this.setBarWidth();
    });
  },
  moved: function() {},
  detached: function() {},
});
