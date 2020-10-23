import { transition } from "../behaviors/transition";
Component({
  options: {
    addGlobalClass: true,
  },
  behaviors: [transition(false)],
  properties: {
    zIndex: {
      type: Number,
      value: 100,
    },
    mask: {
      type: Boolean,
      value: true,
    },
    maskStyle: String,
    position: {
      type: String,
      value: "center",
      observer: "observeClass",
    },
    closeable: {
      type: Boolean,
      value: false,
    },
    closeIcon: { type: String, value: "close" },
    closeIconPosition: {
      type: String,
      value: "top-right",
    },
    closeOnClickMask: {
      type: Boolean,
      value: true,
    },
    closeIconSize: {
      type: String,
      value: "40rpx",
    },
    round: {
      type: Boolean,
      value: false,
    },
  },
  data: {},
  methods: {
    onMaskClick() {
      this.triggerEvent("mask-click");
      if (this.properties.closeOnClickMask) {
        this.triggerEvent("close");
      }
    },
    observeClass() {
      const { position } = this.properties;
      this.setData({ name: position });
    },
    onCloseClick() {
      this.triggerEvent("close");
    },
  },
  created: function () {
    this.observeClass();
  },
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
