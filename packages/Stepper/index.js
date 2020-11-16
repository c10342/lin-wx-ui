function add(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
const timeSecond = 500;
Component({
  behaviors: ["wx://form-field"],
  options: {
    addGlobalClass: true,
  },
  externalClasses: ["custom-class", "input-class", "plus-class", "minus-class"],
  properties: {
    name: String,
    value: {
      type: Number,
      value: null,
      observer(value) {
        if (this.properties.asyncChange) {
          wx.hideLoading();
        }
        this.setData({ inputValue: this.formatValue(value) });
      },
    },
    min: {
      type: Number,
      value: 1,
    },
    max: {
      type: Number,
      value: null,
    },
    step: {
      type: Number,
      value: 1,
    },
    integer: Boolean,
    disabled: Boolean,
    decimalLength: {
      type: Number,
      value: null,
    },
    inputWidth: {
      type: String,
      value: "64rpx",
    },
    buttonSize: {
      type: String,
      value: "56rpx",
    },
    buttonFontSize: {
      type: String,
      value: "40rpx",
    },
    inputFontSize: {
      type: String,
      value: "30rpx",
    },
    disableInput: Boolean,
    showPlus: {
      type: Boolean,
      value: true,
    },
    showMinus: {
      type: Boolean,
      value: true,
    },
    disablePlus: Boolean,
    disableMinus: Boolean,
    asyncChange: Boolean,
    longPress: {
      type: Boolean,
      value: true,
    },
  },
  observers: {
    "disabled,disableMinus,min,inputValue": function(
      disabled,
      disableMinus,
      min,
      inputValue
    ) {
      if (disabled || disableMinus || (min != null && inputValue <= min)) {
        this.setData({
          isMinusDisable: true,
        });
      } else {
        this.setData({
          isMinusDisable: false,
        });
      }
    },
    "disabled,disablePlus,max,inputValue": function(
      disabled,
      disablePlus,
      max,
      inputValue
    ) {
      if (disabled || disablePlus || (max != null && inputValue >= max)) {
        this.setData({
          isPlusDisable: true,
        });
      } else {
        this.setData({
          isPlusDisable: false,
        });
      }
    },
  },
  data: {
    inputValue: "",
    isMinusDisable: false,
    isPlusDisable: false,
  },
  methods: {
    onTouchend() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    onMinusLongpress() {
      if (this.data.isMinusDisable || !this.properties.longPress) {
        return;
      }
      this.onTouchend();
      this.timer = setInterval(() => {
        this.onMinus();
      }, timeSecond);
    },
    onPlusLongpress() {
      if (this.data.isPlusDisable || !this.properties.longPress) {
        return;
      }
      this.onTouchend();
      this.timer = setInterval(() => {
        this.onPlus();
      }, timeSecond);
    },
    onMinus() {
      const { step } = this.properties;
      const { inputValue, isMinusDisable } = this.data;
      if (isMinusDisable) {
        this.triggerEvent("overlimit", {
          type: "minus",
        });
        return;
      }

      let value = add(inputValue * 1, -(step * 1));
      this.emitChange(value);
      this.triggerEvent("minus");
    },
    onPlus() {
      const { step } = this.properties;
      const { inputValue, isPlusDisable } = this.data;
      if (isPlusDisable) {
        this.triggerEvent("overlimit", {
          type: "plus",
        });
        return;
      }
      let value = add(inputValue * 1, step * 1);
      this.emitChange(value);
      this.triggerEvent("plus");
    },
    onBlur(event) {
      let value = event.detail.value;
      this.emitChange(value);
      this.triggerEvent("blur");
    },
    onFocus() {
      this.triggerEvent("focus");
    },
    formatValue(value) {
      value = value * 1;
      const { integer, max, min, decimalLength } = this.properties;
      if (integer) {
        value = parseInt(value);
      }
      if (max != null && max < value) {
        value = max;
      }
      if (min != null && min > value) {
        value = min;
      }
      if (decimalLength) {
        value = value.toFixed(decimalLength);
      }
      return value;
    },
    emitChange(value) {
      if (value != this.data.inputValue) {
        const inputValue = this.formatValue(value);
        if (this.properties.asyncChange) {
          wx.showLoading();
        } else {
          this.setData({
            inputValue: inputValue,
          });
        }

        this.triggerEvent("change", inputValue);
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.timer = null;
    const { value, min } = this.properties;
    let inputValue = 0;
    if (value) {
      inputValue = value;
    } else if (min) {
      inputValue = min;
    }
    this.setData({
      inputValue: this.formatValue(inputValue),
    });
  },
  moved: function() {},
  detached: function() {
    this.onTouchend();
  },
});
