const cacheKey = "_storage_cache_key_";

export function addCacheKey(key: string) {
  const cacheList = wx.getStorageSync(cacheKey) || [];
  const index = cacheList.findIndex((k) => key === k);
  if (index > -1) {
    cacheList.splice(index, 1);
  }
  cacheList.push(key);
  wx.setStorageSync(cacheKey, cacheList);
}

export function deleteCacheKey(key: string) {
  const cacheList = wx.getStorageSync(cacheKey) || [];
  const index = cacheList.findIndex((k) => key === k);
  if (index > -1) {
    cacheList.splice(index, 1);
  }
  wx.setStorageSync(cacheKey, cacheList);
}

export function getCahceKey() {
  return wx.getStorageSync(cacheKey) || [];
}

export function removeCacheKey(key: string) {
  wx.removeStorageSync(key);
  deleteCacheKey(key);
}

export function isOverLimitSize(maxSize: number) {
  const info = wx.getStorageInfoSync();
  let limitSize = info.limitSize;
  if (maxSize && maxSize > 0 && maxSize <= info.limitSize) {
    limitSize = maxSize;
  }
  if (info.currentSize >= limitSize) {
    // 超出存储长度
    const outKeys = getCahceKey() || [];
    removeCacheKey(outKeys[0]);
  }
}
