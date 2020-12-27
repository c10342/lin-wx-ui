Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    price: {
      type: [String, Number],
      observer: "updatePrice",
    },
    label: {
      type: String,
      value: "合计：",
    },
    suffixLabel: String,
    buttonText: String,
    buttonType: {
      type: String,
      value: "danger",
    },
    tip: String,
    tipIcon: String,
    disabled: Boolean,
    loading: Boolean,
    currency: {
      type: String,
      value: "¥",
    },
    decimalLength: {
      type: Number,
      value: 2,
    },
  },
  data: {
    integer: "0",
    decimal: "00",
  },
  methods: {
    updatePrice() {
      const { price } = this.properties;
      this.setData(this.handelPrice(price));
    },
    handelPrice(price) {
      const { decimalLength } = this.properties;
      const priceObj = {
        integer: "0",
        decimal: "00",
      };
      price = price.toString();
      const priceArr = price.split(".");
      priceObj.integer = priceArr[0];
      let decimal = priceArr[1] || "00";
      while (decimal.length < decimalLength) {
        decimal = `${decimal}0`;
      }
      priceObj.decimal = decimal;
      return priceObj;
    },
    onButtonClick() {
      this.triggerEvent("submit");
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
