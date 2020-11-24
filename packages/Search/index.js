import {WHITE} from '../common/color'
Component({
  behaviors: ["wx://form-field"],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    "custom-class",
    "input-class",
    "field-class",
    "cancel-class",
  ],
  properties: {
    label: String,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      value: "search",
    },
    rightIcon: String,
    focus: Boolean,
    value: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    maxlength: {
      type: Number,
      value: -1,
    },
    inputAlign: String,
    placeholder: String,
    placeholderStyle: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    actionText: {
      type: String,
      value: "取消",
    },
    background: {
      type: String,
      value: WHITE,
    },
    shape: {
      type: String,
      value: "square",
    },
    name: String,
  },
  data: {},
  methods: {
    onChange(event) {
      this.triggerEvent("change", event.detail);
    },

    onCancel(event) {
      this.triggerEvent("cancel");
      this.triggerEvent("change", "");
    },

    onSearch(event) {
      this.triggerEvent("search", event.detail);
    },

    onFocus(event) {
      this.triggerEvent("focus", event.detail);
    },

    onBlur(event) {
      this.triggerEvent("blur", event.detail);
    },

    onClear(event) {
      this.triggerEvent("clear", event.detail);
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
