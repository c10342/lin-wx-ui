import LinkBehavior from '../behaviors/link';

Component({
  name:'Card',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  behaviors: [LinkBehavior],
  externalClasses: [
    'custom-class',
    'thumb-class',
    'tag-class',
    'image-class',
    'content-class',
    'title-class',
    'desc-class',
    'price-class',
    'currency-class',
    'integer-class',
    'decimal-class',
    'origin-price-class',
    'num-class'
  ],
  properties: {
    // 左侧图片
    thumb: String,
    // 左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值
    thumbMode: {
      type: String,
      value: 'aspectFit'
    },
    // 标题
    title: String,
    // 描述
    desc: String,
    // 标签
    tag: String,
    // 商品数量
    num: {
      type: [String, Number]
    },
    // 商品价格
    price: {
      type: [String, Number],
      observer: 'updatePrice'
    },
    // 商品划线原价
    originPrice: {
      type: [String, Number]
    },
    // 货币符号
    currency: {
      type: String,
      value: '¥'
    },
    // 点击左侧图片后跳转的链接地址
    thumbLink: String,
    // 是否开启图片懒加载
    lazyLoad: Boolean
  },
  data: {
    // 价格整数部分
    integer: '0',
    // 价格小数部分
    decimal: '00'
  },
  methods: {
    // 价格发生变化
    updatePrice () {
      const { price } = this.properties;
      this.setData(this.handelPrice(price));
    },
    // 转化价格
    handelPrice (price) {
      const priceObj = {
        integer: '0',
        decimal: '00'
      };
      price = price.toString();
      // 分割整数和小数点
      const priceArr = price.split('.');
      // 整数部分
      priceObj.integer = priceArr[0];
      // 小数部分
      let decimal = priceArr[1] || '00';
      if (decimal.length < 2) {
        // 小数部分不足2位数则补0
        decimal = `${decimal}0`;
      }
      priceObj.decimal = decimal;
      return priceObj;
    },
    // 点击左侧图片
    onThumbClick () {
      const { thumbLink } = this.properties;
      this.jump(thumbLink);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
