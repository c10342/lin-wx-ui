export function getKey(idkey, key) {
  return `${idkey}${key}`;
}

// 获取原本的key值，因为存取进去的key值是带上标识的，如 storage-test
export function getOriginKey(idkey, key) {
  if (key) {
    return key.replace(idkey, '');
  }
  return '';
}

// 检查数据是否过期，true过期，false没过期
export function checkExpire(val) {
  if (val.options && val.options.expire) {
    const now = Date.now();
    // true过期，false没过期
    return val.options.expire < now;
  }
  return false;
}

// 检查key值是否为这个工具类存储的
export function isStorageKey(idkey, key) {
  return key.startsWith(idkey);
}

// promise化函数
export function promisify(fnName) {
  return function (options = {}) {
    // options不包含 success/fail/complete 时将默认返回 promise，否则仍按回调方式执行
    if (options.success || options.fail || options.complete) {
      return wx[fnName](options);
    }
    return new Promise((resolve, reject) => {
      wx[fnName]({
        ...options,
        fail: reject,
        success: resolve
      });
    });
  };
}

// 将开发者需要存储的数据转化为工具类要求的格式
export function initData(val, options) {
  const valueObj = {
    data: val
  };
  if (options && options.expire) {
    valueObj.options = {
      expire: Date.now() + options.expire
    };
  }
  return valueObj;
}

// 判断是否为空值
export function isNotDefine(val) {
  return val === null || val === undefined || val === '';
}
