Component({
  name: 'SubmitBar',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    'custom-class',
    'tip-class',
    'tip-text-class',
    'content-class',
    'text-class',
    'label-class',
    'price-class',
    'currency-class',
    'integer-class',
    'decimal-class',
    'suffixLabel-class',
    'button-class',
  ],
  properties: {
    // 价格
    price: {
      type: [String, Number],
      observer: 'updatePrice',
    },
    // 价格文案
    label: {
      type: String,
      value: '合计：',
    },
    // 价格右侧文案
    suffixLabel: String,
    // 按钮文字
    buttonText: String,
    // 按钮类型
    buttonType: {
      type: String,
      value: 'danger',
      options: [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
        'default',
        'success',
      ],
    },
    // 提示文案
    tip: String,
    // 图标名称
    tipIcon: String,
    // 是否禁用按钮
    disabled: Boolean,
    // 是否显示加载中的按钮
    loading: Boolean,
    // 货币符号
    currency: {
      type: String,
      value: '¥',
    },
    // 价格小数点后位数
    decimalLength: {
      type: Number,
      value: 2,
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    // 整数部分
    integer: '0',
    // 小数部分
    decimal: '00',
  },
  methods: {
    // 更新价格文本
    updatePrice() {
      const { price } = this.properties;
      this.setData(this.handelPrice(price));
    },
    // 处理价格
    handelPrice(price) {
      // 小数点长度部分
      const { decimalLength } = this.properties;
      const priceObj = {
        integer: '0',
        decimal: '00',
      };
      price = price.toString();
      const priceArr = price.split('.');
      priceObj.integer = priceArr[0];
      let decimal = priceArr[1] || '00';
      // 小数点后面位数不足要补0
      while (decimal.length < decimalLength) {
        decimal = `${decimal}0`;
      }
      priceObj.decimal = decimal;
      return priceObj;
    },
    onButtonClick() {
      this.triggerEvent('submit');
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
