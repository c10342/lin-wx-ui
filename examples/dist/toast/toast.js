import { isObject } from '../common/is.js';

// 默认配置
const defaultOptions = {
  // 提示类型
  type: 'text',
  // 是否显示遮罩层
  mask: false,
  // 是否显示
  show: true,
  // z-index 层级
  zIndex: 1000,
  // 展示时长(ms)，值为 0 时，toast 不会消失
  duration: 2000,
  // 位置
  position: 'middle',
  // 是否禁止背景点击
  forbidClick: false,
  // 自定义选择器
  selector: '#lin-toast'
};

// 存储所有实例
let queue = [];

// 当前配置
let currentOptions = { ...defaultOptions };

// 转化message配置
function parseOptions(message) {
  return isObject(message) ? message : { message };
}

// 获取上下文
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(options) {
  // 合并配置
  options = { ...currentOptions, ...parseOptions(options) };

  // 获取上下文
  const context = options.context || getContext();
  // 获取组件实例
  const toast = context.selectComponent(options.selector);

  if (!toast) {
    console.warn('未找到 lin-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }

  // 删除上下文和自定义选择器
  delete options.context;
  delete options.selector;

  // 关闭toast
  toast.clear = () => {
    toast.setData({ show: false });
    if (options.onClose) {
      // 执行回调函数
      options.onClose();
    }
  };

  // 保存实例
  queue.push(toast);
  // 设置数据
  toast.setData(options);
  clearTimeout(toast.timer);
  if (options.duration > 0) {
    // duration大于0则自动消失
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter((item) => item !== toast);
    }, options.duration);
  }
  return toast;
}

// 创建出不同类型的toast
const createMethod = (type) => (options) =>
  Toast({
    type,
    ...parseOptions(options)
  });

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');

// 清除所有toast
Toast.clear = () => {
  queue.forEach((toast) => {
    toast.clear();
  });
  queue = [];
};

// 设置配置
Toast.setDefaultOptions = (options) => {
  Object.assign(currentOptions, options);
};

// 重置默认配置
Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
