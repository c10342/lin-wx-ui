import { WHITE } from '../common/color';

const defaultOptions = {
  selector: '#lin-notify',
  type: 'danger',
  message: '',
  background: '',
  duration: 3000,
  zIndex: 100,
  top: '0px',
  color: WHITE,
  onClick: () => {},
  onOpened: () => {},
  oClose: () => {}
};

let currentOptions = { ...defaultOptions };

function parseOptions (option) {
  if (!option) {
    return {};
  }
  if (typeof option === 'string') {
    return { message: option };
  }
  return option;
}

function getContext () {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Notify (options) {
  options = { ...currentOptions, ...parseOptions(options) };

  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);

  delete options.context;
  delete options.selector;

  if (notify) {
    notify.setData(options);
    notify.show();
    return notify;
  }
  console.warn('未找到 lin-notify 节点，请确认 selector 及 context 是否正确');
}

Notify.clear = function (options) {
  options = { ...currentOptions, ...parseOptions(options) };
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  if (notify) {
    notify.hide();
  }
};

Notify.currentOptions = currentOptions;

Notify.defaultOptions = defaultOptions;

Notify.setDefaultOptions = (options) => {
  currentOptions = { ...currentOptions, ...options };
  Notify.currentOptions = currentOptions;
};

Notify.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Notify.currentOptions = currentOptions;
};
Notify.resetDefaultOptions();

export default Notify;
