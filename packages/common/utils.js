let systemInfo;

// 系统信息
export function getSystemInfoSync() {
  if (systemInfo == null) {
    // 缓存系统信息，性能优化
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

// 定时器封装
export function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

const REGEXP = /^[0-9]+$/;
// 添加样式单位，如果是Number类型，则需要补个px
export function addUnit(value) {
  if (value == null) {
    return undefined;
  }

  return REGEXP.test(`${value}`) ? `${value}px` : value;
}

// 查询单个元素信息
export function getRect(context, element) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(element)
      .boundingClientRect(resolve)
      .exec();
  });
}

// 查询所有元素信息
export function getAllRect(context, element) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .selectAll(element)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

// 查询视图窗口信息
export function getViewPort(context) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .selectViewport()
      .scrollOffset(resolve)
      .exec();
  });
}
