// import { RED, GRAY } from "../common/color";
import { button } from "../behaviors/button";
import { openType } from "../behaviors/open-type";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: [
    "custom-class",
    "header-class",
    "content-class",
    "footer-class",
    "cancel-class",
    "confirm-class",
  ],
  behaviors: [button, openType],
  properties: {
    show: {
      type: Boolean,
      observer(show) {
        if (!show) {
          this.stopLoading();
        }
      },
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
    confirmButtonColor: String,
    cancelButtonColor: String,
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    mask: {
      type: Boolean,
      value: true,
    },
    transition: {
      type: String,
      value: "scale",
    },
  },
  data: {
    onConfirm: null,
    onCancel: null,
    loading: {
      confirm: false,
      cancel: false,
    },
  },
  methods: {
    onMaskClick() {
      this.onClose("mask");
    },
    onConfirm() {
      if (this.data.loading.confirm) {
        return;
      }
      this.handleAction("confirm");
    },
    onCancel() {
      if (this.data.loading.cancel) {
        return;
      }
      this.handleAction("cancel");
    },
    handleAction(action) {
      if (this.data.asyncClose) {
        this.setData({
          [`loading.${action}`]: true,
        });
      }
      this.onClose(action);
    },
    onCancel(action) {
      this.onClose(action);
    },
    close() {
      this.setData({
        show: false,
      });
    },
    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false,
        },
      });
    },
    onClose(action) {
      if (!this.properties.asyncClose) {
        this.close();
      }
      this.triggerEvent("close", action);
      this.triggerEvent(action, {
        dialog: this,
      });
      const callback = this.data[
        action === "confirm" ? "onConfirm" : "onCancel"
      ];
      if (callback) {
        callback(this);
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
