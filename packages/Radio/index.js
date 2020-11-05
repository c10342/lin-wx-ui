const shapeValue = "round";
Component({
  behaviors: ["wx://form-field"],
  relations: {
    "../RadioGroup/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    useIconSlot: Boolean,
    iconSize: {
      type: String,
      value: "40rpx",
    },
    shape: {
      type: String,
      options: ["round", "square"],
      value: shapeValue,
    },
    checkedColor: String,
    value: {
      type: null,
    },
    disabled: Boolean,
    name: {
      type: null,
    },
    labelDisabled: Boolean,
  },
  observers: {
    "value,shape": function (value, shape) {
      let iconName = shape;
      if (value) {
        iconName = `${iconName}-active`;
      }
      this.setData({
        iconName,
      });
    },
  },
  data: {
    iconName: shapeValue,
    parentDisabled: false,
  },
  methods: {
    emitChange(value) {
      const instance = this.parent || this;
      instance.triggerEvent("input", value);
      instance.triggerEvent("change", value);
    },
    onIconClick() {
      const { disabled } = this.properties;
      const { parentDisabled } = this.data;
      if (!disabled && !parentDisabled) {
        this.emitChange(this.properties.name);
      }
    },
    onLabelClick() {
      const { disabled, labelDisabled } = this.properties;
      const { parentDisabled } = this.data;
      if (!disabled && !labelDisabled && !parentDisabled) {
        this.emitChange(this.properties.name);
      }
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
