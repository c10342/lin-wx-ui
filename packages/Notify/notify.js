import { WHITE } from '../common/color';

// 默认配置
const defaultOptions = {
  // 自定义节点选择器
  selector: '#lin-notify',
  // 类型
  type: 'danger',
  // 展示文案
  message: '',
  // 背景颜色
  background: '',
  // 展示时长(ms)，值为 0 时，notify 不会消失
  duration: 3000,
  // z-index 层级
  zIndex: 100,
  // 顶部距离
  top: '0px',
  // 字体颜色
  color: WHITE,
  // 是否留出顶部安全距离（状态栏高度）
  safeAreaInsetTop: false,
  // 点击时的回调函数
  onClick: () => {},
  // 完全展示后的回调函数
  onOpened: () => {},
  // 关闭时的回调函数
  oClose: () => {}
};

// 当前配置
let currentOptions = { ...defaultOptions };

// 转化参数
function parseOptions(option) {
  if (!option) {
    return {};
  }
  if (typeof option === 'string') {
    // 如果是字符串类型，则需要转化为object类型
    return { message: option };
  }
  return option;
}

// 获取当前页面上下文
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Notify(options) {
  // 合并参数
  options = { ...currentOptions, ...parseOptions(options) };
  // 获取页面上下文
  const context = options.context || getContext();
  // 获取组件
  const notify = context.selectComponent(options.selector);
  // 删除上下文和节点选择器
  delete options.context;
  delete options.selector;

  if (notify) {
    notify.setData(options);
    notify.show();
    return notify;
  }
  console.warn('未找到 lin-notify 节点，请确认 selector 及 context 是否正确');
}

// 关闭组件
Notify.clear = function (options) {
  options = { ...currentOptions, ...parseOptions(options) };
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  if (notify) {
    notify.hide();
  }
};

// 挂在当前配置
Notify.currentOptions = currentOptions;

// 挂在默认配置
Notify.defaultOptions = defaultOptions;

// 设置当前配置
Notify.setDefaultOptions = (options) => {
  currentOptions = { ...currentOptions, ...options };
  Notify.currentOptions = currentOptions;
};

// 重置当前配置为默认配置
Notify.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Notify.currentOptions = currentOptions;
};
Notify.resetDefaultOptions();

export default Notify;
