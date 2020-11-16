Component({
  behaviors: ["wx://form-field"],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    checked: {
      type: Boolean,
      value: false,
      observer: "updateValue",
    },
    name: String,
    activeColor: {
      type: String,
      value: "#1989fa",
    },
    inactiveColor: {
      type: String,
      value: "#fff",
    },
    activeValue: {
      type: null,
      value: true,
    },
    inactiveValue: {
      type: null,
      value: false,
    },
  },
  data: {
    value: false,
  },
  methods: {
    onClick() {
      this.triggerEvent("change", !this.properties.checked);
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
