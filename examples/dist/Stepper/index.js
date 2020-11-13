function add(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
Component({
  properties: {
    value: {
      type: Number,
      value: null,
      observer(value) {
        this.setData({ currentValue: this.formatValue(value) });
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
  },
  data: {
    inputValue: "",
  },
  methods: {
    onMinus() {
      const { step, disabled } = this.properties;
      if (disabled) {
        return;
      }
      const { inputValue } = this.data;

      let value = add(inputValue * 1, -(step * 1));
      this.emitChange(value);
      this.triggerEvent("minus");
    },
    onPlus() {
      const { step, disabled } = this.properties;
      if (disabled) {
        return;
      }
      const { inputValue } = this.data;
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
        this.setData({
          inputValue: inputValue,
        });
        this.triggerEvent("change", inputValue);
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
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
  detached: function() {},
});
