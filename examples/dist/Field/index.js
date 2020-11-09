import { commonProps, inputProps, textareaProps } from "./props.js";
import { canIUseModel } from "../common/version.js";
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    "label-class",
    "input-class",
    "right-icon-class",
    "value-class",
    "header-class",
  ],
  properties: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    size: String,
    isLink: Boolean,
    border: { type: Boolean, value: true },
    required: Boolean,
    leftIcon: String,
    label: String,
    clickable: Boolean,
    titleWidth: {
      type: String,
      value: "6.2em",
    },
    arrowDirection: String,
    readonly: {
      type: Boolean,
      observer: "setShowClear",
    },
    inputAlign: String,
    rightIcon: String,
    clearable: { type: Boolean, observer: "setShowClear" },
    errorMessage: String,
    useButtonSlot: Boolean,
    customStyle: String,
  },
  data: {
    inputValue: "",
    // focused: false,
    showClear: false,
  },
  methods: {
    emitChange() {
      // 双向数据绑定
      if (canIUseModel()) {
        this.setData({ value: this.value });
      }
      wx.nextTick(() => {
        this.triggerEvent("change", this.value);
      });
    },
    onInput(event) {
      const { value = "" } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.emitChange();
    },
    onBlur(event) {
      this.focused = false;
      this.setShowClear();
      this.triggerEvent("blur", event.detail);
    },
    onFocus(event) {
      this.focused = true;
      this.setShowClear();
      this.triggerEvent("focus", event.detail);
    },
    onClear() {
      this.setData({ inputValue: "" });
      this.value = "";
      this.setShowClear();
      wx.nextTick(() => {
        this.emitChange();
        this.triggerEvent("clear", "");
      });
    },
    onConfirm(event) {
      const { value = "" } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.triggerEvent("confirm", value);
    },
    onLineChange(event) {
      this.triggerEvent("linechange", event.detail);
    },
    onKeyboardHeightChange(event) {
      this.triggerEvent("keyboardheightchange", event.detail);
    },
    onRightIconClick() {
      this.triggerEvent("click-icon");
    },
    setShowClear() {
      const { clearable, readonly } = this.properties;
      const { focused, value } = this;
      this.setData({
        showClear: !!clearable && !!focused && !!value && !readonly,
      });
    },
  },
  created: function() {
    this.value = this.properties.value;
    this.setData({ inputValue: this.value });
  },
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});