import mergeConfig from '../core/mergeConfig';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';

export default function Request(config) {
  // 配置
  this.defaults = config;
  // 拦截器
  this.interceptor = {
    request: new InterceptorManager(),
    respond: new InterceptorManager()
  };
}

// 函数重载
// request('/abc',{...})
// request({...})
Request.prototype.request = function (url, config = {}) {
  if (typeof url === 'string') {
    if (!config) {
      config = {};
    }
    config.url = url;
  } else {
    config = url;
  }
  // 合并配置
  config = mergeConfig(this.defaults, config);
  config.method = config.method.toLocaleLowerCase();

  // 定义一个数组，实现链式调用
  //   const chain = [
  //     {
  //       resolve: dispatchRequest,
  //       reject: undefined
  //     }
  //   ];

  let promise = Promise.resolve(config);

  promise = promise.then(dispatchRequest, undefined);

  return promise;
};

Request.prototype.get = function (url, config = {}) {
  return this._request('get', url, config);
};

Request.prototype.post = function (url, config = {}) {
  return this._request('post', url, config);
};

Request.prototype._request = function (method, url, config) {
  return this.request(
    Object.assign(config || {}, {
      method,
      url
    })
  );
};
