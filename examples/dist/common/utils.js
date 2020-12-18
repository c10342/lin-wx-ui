let systemInfo;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function isObj(obj) {
  const type = typeof obj;
  return obj !== null && (type === "object" || type === "function");
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

  return REGEXP.test("" + value) ? value + "px" : value;
}
