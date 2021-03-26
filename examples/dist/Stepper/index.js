import FormControls from '../behaviors/form-controls';

function add (num1, num2) {
  // 处理小数点计算精度丢失的问题
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
const timeSecond = 500;
Component({
  name: 'Stepper',
  options: {
    addGlobalClass: true
  },
  behaviors: ['wx://form-field', FormControls],
  externalClasses: ['custom-class', 'input-class', 'plus-class', 'minus-class'],
  properties: {
    // 在表单内提交时的标识符
    name: String,
    // 输入值
    value: {
      type: Number,
      value: null,
      observer (value) {
        if (this.properties.asyncChange) {
          // 异步改变值得情况下，值改变就隐藏loading
          wx.hideLoading();
        }
        this.setData({ inputValue: this.formatValue(value) });
      }
    },
    // 最小值
    min: {
      type: Number,
      value: 1
    },
    // 最大值
    max: {
      type: Number,
      value: null
    },
    // 步长
    step: {
      type: Number,
      value: 1
    },
    // 是否只允许输入整数
    integer: Boolean,
    // 是否禁用
    disabled: Boolean,
    // 固定显示的小数位数
    decimalLength: {
      type: Number,
      value: null
    },
    // 输入框宽度，默认单位为 px
    inputWidth: {
      type: [String, Number],
      value: '64rpx'
    },
    // 按钮大小，默认单位为 px，输入框高度会和按钮大小保持一致
    buttonSize: {
      type: [String, Number],
      value: '56rpx'
    },
    // 按钮字体大小
    buttonFontSize: {
      type: [String, Number],
      value: '40rpx'
    },
    // 输入框字体大小
    inputFontSize: {
      type: [String, Number],
      value: '30rpx'
    },
    // 是否禁用输入框
    disableInput: Boolean,
    // 是否显示增加按钮
    showPlus: {
      type: Boolean,
      value: true
    },
    // 是否显示减少按钮
    showMinus: {
      type: Boolean,
      value: true
    },
    // 是否禁用增加按钮
    disablePlus: Boolean,
    // 是否禁用减少按钮
    disableMinus: Boolean,
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: Boolean,
    // 是否开启长按手势
    longPress: {
      type: Boolean,
      value: true
    }
  },
  observers: {
    'disabled,disableMinus,min,inputValue': function (
      disabled,
      disableMinus,
      min,
      inputValue
    ) {
      if (disabled || disableMinus || (min != null && inputValue <= min)) {
        // 值小于等于最小值，要禁用
        this.setData({
          isMinusDisable: true
        });
      } else {
        this.setData({
          isMinusDisable: false
        });
      }
    },
    'disabled,disablePlus,max,inputValue': function (
      disabled,
      disablePlus,
      max,
      inputValue
    ) {
      if (disabled || disablePlus || (max != null && inputValue >= max)) {
        // 值大于等于最大值，要禁用
        this.setData({
          isPlusDisable: true
        });
      } else {
        this.setData({
          isPlusDisable: false
        });
      }
    }
  },
  data: {
    // 输入框的值
    inputValue: '',
    // 是否禁用减少按钮
    isMinusDisable: false,
    // 是否禁用增加按钮
    isPlusDisable: false
  },
  methods: {
    // 触摸事件结束
    onTouchend () {
      // 清空定时器
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 长按事件
    onMinusLongpress () {
      if (this.data.isMinusDisable || !this.properties.longPress) {
        return;
      }
      this.onTouchend();
      // 利用定时器自减
      this.timer = setInterval(() => {
        this.onMinus();
      }, timeSecond);
    },
    onPlusLongpress () {
      if (this.data.isPlusDisable || !this.properties.longPress) {
        return;
      }
      this.onTouchend();
      this.timer = setInterval(() => {
        this.onPlus();
      }, timeSecond);
    },
    // 点击减号
    onMinus () {
      const { step } = this.properties;
      const { inputValue, isMinusDisable } = this.data;
      if (isMinusDisable) {
        // 禁用了再点击就会发射越界事件
        this.triggerEvent('overlimit', {
          type: 'minus'
        });
        return;
      }
      // 自减
      const value = add(inputValue * 1, -(step * 1));
      this.emitChange(value);
      this.triggerEvent('minus');
    },
    onPlus () {
      const { step } = this.properties;
      const { inputValue, isPlusDisable } = this.data;
      if (isPlusDisable) {
        // 禁用了再点击就会发射越界事件
        this.triggerEvent('overlimit', {
          type: 'plus'
        });
        return;
      }
      // 自加
      const value = add(inputValue * 1, step * 1);
      this.emitChange(value);
      this.triggerEvent('plus');
    },
    // 输入框失去焦点事件
    onBlur (event) {
      const value = event.detail.value;
      this.emitChange(value);
      this.triggerEvent('blur', value);

      this.triggerParentBlur(value);
    },
    // 输入框获得焦点事件
    onFocus (event) {
      const value = event.detail.value;
      this.triggerEvent('focus', value);
    },
    // 格式化值
    formatValue (value) {
      // 转化为数字
      value *= 1;
      const {
        integer, max, min, decimalLength
      } = this.properties;
      if (integer) {
        // 只允许输入整数
        value = parseInt(value, 10);
      }
      // 处理临界值
      if (max != null && max < value) {
        value = max;
      }
      if (min != null && min > value) {
        value = min;
      }
      if (decimalLength) {
        // 显示固定的小数位
        value = value.toFixed(decimalLength);
      }
      return value;
    },
    // changge事件
    emitChange (value) {
      if (value !== this.data.inputValue) {
        // 格式化值
        const inputValue = this.formatValue(value);
        if (this.properties.asyncChange) {
          // 异步改变的时候,显示loading
          wx.showLoading();
        } else {
          this.setData({
            inputValue
          });
        }
        this.triggerEvent('change', inputValue);
      }
    }
  },
  created () {},
  attached () {},
  ready () {
    this.timer = null;
    const { value, min } = this.properties;
    // 初始化输入框的值
    let inputValue = 0;
    if (value) {
      inputValue = value;
    } else if (min) {
      inputValue = min;
    }
    this.setData({
      inputValue: this.formatValue(inputValue)
    });
  },
  moved () {},
  detached () {
    this.onTouchend();
  }
});
