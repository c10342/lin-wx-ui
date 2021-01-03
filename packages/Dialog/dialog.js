// import { GRAY, RED } from "../common/color";

let queue = [];

const defaultOptions = {
  show: false,
  title: '',
  width: '640rpx',
  theme: 'default',
  message: '',
  zIndex: 100,
  mask: true,
  selector: '#lin-dialog',
  className: '',
  asyncClose: false,
  transition: 'scale',
  customStyle: '',
  messageAlign: 'center',
  maskStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickMask: false,
  confirmButtonOpenType: '',
  // confirmButtonColor: RED,
  // cancelButtonColor: GRAY,
};

let currentOptions = { ...defaultOptions };

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Dialog = (options) => {
  options = {
    ...currentOptions,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);

    delete options.context;
    delete options.selector;

    if (dialog) {
      dialog.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options,
      });

      wx.nextTick(() => {
        dialog.setData({ show: true });
      });

      queue.push(dialog);
    } else {
      console.warn(
        '未找到 lin-dialog 节点，请确认 selector 及 context 是否正确',
      );
    }
  });
};

Dialog.alert = (options) => Dialog(options);

Dialog.confirm = (options) => Dialog({
  showCancelButton: true,
  ...options,
});

Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};

Dialog.currentOptions = currentOptions;

Dialog.defaultOptions = defaultOptions;

Dialog.setDefaultOptions = (options) => {
  currentOptions = { ...currentOptions, ...options };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions();

export default Dialog;
