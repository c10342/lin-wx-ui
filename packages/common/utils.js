let systemInfo;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function isObj(obj) {
  const type = typeof obj;
  return obj !== null && (type === 'object' || type === 'function');
}

export function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

const REGEXP = /^[0-9]+$/;
export function addUnit(value) {
  if (value == null) {
    return undefined;
  }

  return REGEXP.test(`${value}`) ? `${value}px` : value;
}

export function getRect(context, element) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .select(element)
      .boundingClientRect(resolve)
      .exec();
  });
}

export function getAllRect(context, element) {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(context)
      .selectAll(element)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}
