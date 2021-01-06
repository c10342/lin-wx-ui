import LinkBehavior from '../behaviors/link';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
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
  behaviors: [LinkBehavior],
  properties: {
    thumb: String,
    thumbMode: {
      type: String,
      value: 'aspectFit'
    },
    title: String,
    desc: String,
    tag: String,
    num: {
      type: [String, Number]
    },
    price: {
      type: [String, Number],
      observer: 'updatePrice'
    },
    originPrice: {
      type: [String, Number]
    },
    currency: {
      type: String,
      value: '¥'
    },
    thumbLink: String,
    lazyLoad: Boolean
  },
  data: {
    integer: '0',
    decimal: '00'
  },
  methods: {
    updatePrice () {
      const { price } = this.properties;
      this.setData(this.handelPrice(price));
    },
    handelPrice (price) {
      const priceObj = {
        integer: '0',
        decimal: '00'
      };
      price = price.toString();
      const priceArr = price.split('.');
      priceObj.integer = priceArr[0];
      let decimal = priceArr[1] || '00';
      if (decimal.length < 2) {
        decimal = `${decimal}0`;
      }
      priceObj.decimal = decimal;
      return priceObj;
    },
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
