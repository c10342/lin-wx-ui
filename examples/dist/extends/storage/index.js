import {
  getKey,
  getOriginKey,
  checkExpire,
  promisify,
  initData,
  isNotDefine,
  isStorageKey
} from './utils';

const setStorage = promisify('setStorage');
const removeStorage = promisify('removeStorage');
const getStorage = promisify('getStorage');
const getStorageInfo = promisify('getStorageInfo');
const clearStorage = promisify('clearStorage');

let defaultConfig = {
  uniqueKey: '__storage__'
};

class Storage {
  setDefaultConfig(config = {}) {
    defaultConfig = Object.assign({}, defaultConfig, config);
  }

  // 设置值
  set(key, val, options) {
    const config = Object.assign({}, defaultConfig, options || {});
    const data = initData(val, config);
    wx.setStorageSync(getKey(defaultConfig.uniqueKey, key), data);
    return val;
  }

  // 获取值
  get(key, def) {
    const val = wx.getStorageSync(getKey(defaultConfig.uniqueKey, key));
    if (isNotDefine(val)) {
      return def;
    }
    const isExpire = checkExpire(val);
    if (!isExpire) {
      // 没过期
      return val.data;
    }
    // 过期
    this.remove(key);
    return def;
  }

  // 是否存在key
  has(key) {
    const val = this.get(key);
    return !isNotDefine(val);
  }

  // 根据key移除缓存
  remove(key) {
    return wx.removeStorageSync(getKey(defaultConfig.uniqueKey, key));
  }

  // 清空所有
  clear() {
    return wx.clearStorageSync();
  }

  getAll() {
    const ret = {};
    const result = wx.getStorageInfoSync();
    let keys = result.keys || [];
    keys = keys.filter((key) => isStorageKey(defaultConfig.uniqueKey, key));
    keys.forEach((key) => {
      const originKey = getOriginKey(defaultConfig.uniqueKey, key);
      const val = this.get(originKey);
      if (!isNotDefine(val)) {
        ret[originKey] = val;
      }
    });
    return ret;
  }

  forEach(callback) {
    const ret = this.getAll();
    Object.keys(ret).forEach((key) => {
      callback(key, ret[key]);
    });
  }

  setSync(key, val, options) {
    const config = Object.assign({}, defaultConfig, options || {});
    const data = initData(val, config);
    return setStorage({
      key: getKey(defaultConfig.uniqueKey, key),
      data: data
    }).then(() => {
      return val;
    });
  }

  getSync(key, def) {
    return getStorage({
      key: getKey(defaultConfig.uniqueKey, key)
    })
      .then((val) => {
        val = val.data;
        if (isNotDefine(val)) {
          return def;
        }
        const isExpire = checkExpire(val);
        if (!isExpire) {
          // 没过期
          return val.data;
        }
        // 过期
        this.removeSync(key);
        return def;
      })
      .catch(() => def);
  }

  hasSync(key) {
    return this.getSync(key)
      .then((val) => !isNotDefine(val))
      .catch(() => false);
  }

  removeSync(key) {
    return removeStorage({
      key: getKey(defaultConfig.uniqueKey, key)
    });
  }

  clearSync() {
    return clearStorage();
  }

  getAllSync() {
    return getStorageInfo().then((result) => {
      const ret = {};
      let keys = result.keys || [];
      keys = keys.filter((key) => isStorageKey(defaultConfig.uniqueKey, key));
      keys.forEach((key) => {
        const originKey = getOriginKey(defaultConfig.uniqueKey, key);
        const val = this.get(originKey);
        if (!isNotDefine(val)) {
          ret[originKey] = val;
        }
      });
      return ret;
    });
  }

  forEachSync(callback) {
    return this.getAllSync().then((ret) => {
      Object.keys(ret).forEach((key) => {
        callback(key, ret[key]);
      });
      return true;
    });
  }
}

export default new Storage();
