import { RED, GRAY } from "../common/color";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    show: {
      type: Boolean,
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: "default",
    },
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: {
      type: String,
      value: "center",
    },
    maskStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickMask: Boolean,
    confirmButtonOpenType: String,
    width: {
      type: String,
      value: "640rpx",
    },
    zIndex: {
      type: Number,
      value: 2000,
    },
    confirmButtonText: {
      type: String,
      value: "确认",
    },
    cancelButtonText: {
      type: String,
      value: "取消",
    },
    confirmButtonColor: {
      type: String,
      value: RED,
    },
    cancelButtonColor: {
      type: String,
      value: GRAY,
    },
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    mask: {
      type: Boolean,
      value: true,
    },
    // transition: {
    //   type: String,
    //   value: "scale",
    // },
  },
  data: {},
  methods: {},
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
