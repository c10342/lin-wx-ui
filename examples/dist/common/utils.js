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

// export function requestAnimationFrame(cb) {
//   const systemInfo = getSystemInfoSync();
//   if (systemInfo.platform === "devtools") {
//     return nextTick(cb);
//   }
//   return wx
//     .createSelectorQuery()
//     .selectViewport()
//     .boundingClientRect()
//     .exec(() => {
//       cb();
//     });
// }
