import storage from '../storage/index';
import request from '../request/index';

let defaultCacheConfig = {
  // cache: false-缓存；1本地有数据就使用本地数据，不请求；2-本地有数据就返回本地数据，然后请求数据回来之后更新缓存
  cache: 1,
  cacheKey(requestConfig, cacheOptions) {
    return requestConfig.url;
  },
  shouldCache(requestConfig, cacheOptions) {
    return requestConfig.method === 'get';
  }
};

function ApiCache() {}

ApiCache.prototype.setCacheConfig = function (config) {
  defaultCacheConfig = Object.assign({}, defaultCacheConfig, config);
};

ApiCache.prototype.request = function (method, url, config, cacheOptions) {
  const requestConfig = Object.assign({}, config || {}, {
    method,
    url
  });

  const cacheConfig = Object.assign({}, defaultCacheConfig, cacheOptions);
  if (
    cacheConfig.cache &&
    cacheConfig.shouldCache(requestConfig, cacheOptions)
  ) {
    // 开启缓存
    const cacheKey = cacheConfig.cacheKey(requestConfig, cacheOptions);
    const cacheValue = storage.get(cacheKey);
    if (cacheValue) {
      //   有缓存值得时候
      if (cacheConfig.cache === 2) {
        request
          .request(requestConfig)
          .then((res) => {
            storage.set(cacheKey, res, cacheConfig);
          })
          .catch(() => {});
      }

      return Promise.resolve(cacheValue);
    } else {
      //   不存在缓存值得时候
      return request
        .request(requestConfig)
        .then((res) => {
          storage.set(cacheKey, res, cacheConfig);
          return Promise.resolve(res);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  } else {
    return request.request(requestConfig);
  }
};

const methodList = [
  'options',
  'get',
  'head',
  'post',
  'put',
  'delete',
  'trace',
  'connect',
  'download',
  'upload'
];

methodList.forEach((method) => {
  ApiCache.prototype[method] = (url, config, cacheOptions) => {
    return this.request(method, url, config, cacheOptions);
  };
});

const apiCache = new ApiCache();

export default apiCache;
