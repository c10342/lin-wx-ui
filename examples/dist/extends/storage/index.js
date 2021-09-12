import { initData, isNotDefine, checkExpire, isFlag } from "./utils";

import { isOverLimitSize, deleteCacheKey, addCacheKey } from "./cache";

let defaultConfig = {};

class Storage {
  setMaxSize(maxSize) {
    this.maxSize = maxSize;
  }

  setDefaultConfig(config = {}) {
    defaultConfig = Object.assign({}, defaultConfig, config);
  }

  // 设置值
  set(key, val, options) {
    const config = Object.assign({}, defaultConfig, options || {});
    isOverLimitSize(this.maxSize);
    const data = initData(val, config);
    wx.setStorageSync(key, data);
    addCacheKey(key);
    return val;
  }

  // 获取值
  get(key, def) {
    const val = wx.getStorageSync(key);
    if (isNotDefine(val)) {
      return def;
    }
    if (isFlag(val)) {
      const isExpire = checkExpire(val);
      if (!isExpire) {
        // 没过期
        addCacheKey(key);
        return val.data;
      }
      // 过期
      this.remove(key);

      return def;
    }
    addCacheKey(key);
    return val;
  }

  // 是否存在key
  has(key) {
    const val = this.get(key);
    return !isNotDefine(val);
  }

  // 根据key移除缓存
  remove(key) {
    deleteCacheKey(key);
    return wx.removeStorageSync(key);
  }

  // 清空所有
  clear() {
    return wx.clearStorageSync();
  }

  // 所有key
  keys() {
    const objs = wx.getStorageInfoSync();
    return objs.keys || [];
  }

  values() {
    const values = this.keys().map((key) => {
      const val = this.get(key);
      if (isFlag(val)) {
        return val.data;
      }
      return val;
    });
    return values;
  }

  forEach(callback) {
    this.keys().forEach((key, index) => {
      const val = this.get(key);
      callback(key, val, index);
    });
  }

  get length() {
    return this.keys().length;
  }
}

const storage = new Storage();

export default storage;
