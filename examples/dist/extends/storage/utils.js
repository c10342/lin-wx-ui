// 检查数据是否过期，true过期，false没过期
export function checkExpire(val) {
  if (val && val.expire) {
    // true过期，false没过期
    const now = Date.now();
    return val.expire < now;
  }
  return false;
}
// promise化函数
export function promisify(fnName) {
  return function (options = {}) {
    // options不包含 success/fail/complete 时将默认返回 promise，否则仍按回调方式执行
    if (options.success || options.fail || options.complete) {
      return wx[fnName](options);
    }
    return new Promise((resolve, reject) => {
      wx[fnName](
        Object.assign(Object.assign({}, options), {
          fail: reject,
          success: resolve
        })
      );
    });
  };
}
// 将开发者需要存储的数据转化为工具类要求的格式
export function initData(val, options) {
  const valueObj = {
    data: val,
    _flag_: true
  };
  if (options && options.expire) {
    valueObj.expire = Date.now() + options.expire;
  }
  return valueObj;
}
// 判断是否为空值
export function isNotDefine(val) {
  return val === null || val === undefined || val === "";
}
// 判断是不是该工具类存储的数据
export const isFlag = (val) => {
  if (!val) {
    return false;
  }
  return !!val._flag_;
};
