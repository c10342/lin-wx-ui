import { BLUE, WHITE } from "../common/color";
Component({
  behaviors: ["wx://form-field"],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class", "node-class"],
  properties: {
    checked: {
      type: Boolean,
      value: false,
      observer: "updateValue",
    },
    name: String,
    activeColor: {
      type: String,
      value: BLUE,
    },
    inactiveColor: {
      type: String,
      value: WHITE,
    },
    activeValue: {
      type: null,
      value: true,
    },
    inactiveValue: {
      type: null,
      value: false,
    },
    disabled: Boolean,
    loading: Boolean,
    size: {
      type: [String, Number],
    },
  },
  data: {
    value: false,
  },
  methods: {
    onClick() {
      const { disabled, checked } = this.properties;
      if (disabled) {
        return;
      }
      this.triggerEvent("change", !checked);
    },
    updateValue() {
      const { checked, activeValue, inactiveValue } = this.properties;
      if (checked) {
        this.setData({
          value: activeValue,
        });
      } else {
        this.setData({
          value: inactiveValue,
        });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.updateValue();
  },
  moved: function() {},
  detached: function() {},
});
