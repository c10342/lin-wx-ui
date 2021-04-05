// 保存所有dialog实例
let queue = [];

// 默认配置
const defaultOptions = {
  // 是否显示
  show: false,
  // 标题
  title: '',
  // 弹窗宽度，默认单位为 px
  width: '640rpx',
  // 样式风格
  theme: 'default',
  // 文本内容
  message: '',
  // z-index 层级
  zIndex: 100,
  // 是否展示遮罩层
  mask: true,
  // dialog组件的id
  selector: '#lin-dialog',
  // 自定义类名
  className: '',
  // 是否异步关闭
  asyncClose: false,
  // 动画名称
  transition: 'scale',
  // 自定义样式
  customStyle: '',
  // 内容对齐方式
  messageAlign: 'center',
  // 遮罩层样式
  maskStyle: '',
  // 确认按钮的文案
  confirmButtonText: '确认',
  // 取消按钮的文案
  cancelButtonText: '取消',
  // 是否展示确认按钮
  showConfirmButton: true,
  // 是否展示取消按钮
  showCancelButton: false,
  // 是否展示取消按钮
  closeOnClickMask: false,
  // 确认按钮的微信开放能力
  confirmButtonOpenType: '',
};

// 当前配置
let currentOptions = { ...defaultOptions };

// 获取页面上下文
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Dialog = (options) => {
  // 合并配置
  options = {
    ...currentOptions,
    ...options,
  };

  return new Promise((resolve, reject) => {
    // 获取上下文
    const context = options.context || getContext();
    // 找到dialog组件
    const dialog = context.selectComponent(options.selector);
    // 删除上下文和selector选择器
    delete options.context;
    delete options.selector;

    if (dialog) {
      // 把reject和resolve传递进入，但点击确定或者取消按钮，就会改变promise的状态
      dialog.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options,
      });

      wx.nextTick(() => {
        // 显示弹框
        dialog.setData({ show: true });
      });
      // 保存dialog实例
      queue.push(dialog);
    } else {
      console.warn(
        '未找到 lin-dialog 节点，请确认 selector 及 context 是否正确'
      );
    }
  });
};

// 展示消息提示弹窗
Dialog.alert = (options) => Dialog(options);

// 展示消息确认弹窗
Dialog.confirm = (options) =>
  Dialog({
    showCancelButton: true,
    ...options,
  });

// 关闭所有弹窗
Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};

// 停止按钮的加载状态
Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};

// 当前配置
Dialog.currentOptions = currentOptions;

// 默认配置
Dialog.defaultOptions = defaultOptions;

// 设置当前配置
Dialog.setDefaultOptions = (options) => {
  currentOptions = { ...currentOptions, ...options };
  Dialog.currentOptions = currentOptions;
};

// 重置当前配置
Dialog.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Dialog.currentOptions = currentOptions;
};

// 先重置一下当前配置
Dialog.resetDefaultOptions();

export default Dialog;
