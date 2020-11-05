const shapeValue = "round";
Component({
  behaviors: ["wx://form-field"],
  relations: {
    "../CheckboxGroup/index": {
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
    value: Boolean,
    disabled: Boolean,
    shape: {
      type: String,
      options: ["round", "square"],
      value: shapeValue,
    },
    checkedColor: String,
    iconSize: {
      type: String,
      value: "40rpx",
    },
    useIconSlot: Boolean,
    labelDisabled: Boolean,
    name: {
      type: null,
    },
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
    toggle() {
      if (this.properties.disabled || this.data.parentDisabled) {
        return;
      }
      this.emitChange();
    },
    onLabelClick() {
      if (
        this.properties.disabled ||
        this.data.parentDisabled ||
        this.properties.labelDisabled
      ) {
        return;
      }
      this.emitChange();
    },
    emitChange() {
      if (this.parent) {
        this.setParentValue(!this.properties.value);
      } else {
        this.triggerEvent("change", !this.properties.value);
      }
    },
    setParentValue(value) {
      let { value: parentValue, max } = this.parent.properties;
      parentValue = parentValue.slice();
      const { name } = this.properties;
      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }
        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          this.parent.emitChange(parentValue);
        }
      } else {
        const index = parentValue.findIndex((item) => item == name);
        if (index > -1) {
          parentValue.splice(index, 1);
          this.parent.emitChange(parentValue);
        }
      }
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
