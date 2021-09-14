import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";
import { deepMerge } from "../helpers/utils";
import { RequestConfig } from "../types";

export default function Request(config: RequestConfig) {
  // 默认配置
  // @ts-ignore
  this.defaults = config;
  // 拦截器
  // @ts-ignore
  this.interceptors = {
    request: new InterceptorManager(),
    respond: new InterceptorManager()
  };
}

// 函数重载
// request('/abc',{...})
// request({...})
Request.prototype.request = function (
  url: string | RequestConfig,
  config?: RequestConfig
) {
  if (typeof url === "string") {
    if (!config) {
      config = {} as RequestConfig;
    }
    config.url = url;
  } else {
    config = url;
  }
  // 合并配置
  config = deepMerge(this.defaults, config);
  // 将请求方法统一转成小写
  // @ts-ignore
  config.method = config.method.toLocaleLowerCase();

  // 定义一个数组，实现链式调用
  const chain = [
    {
      resolve: dispatchRequest as any,
      reject: undefined
    }
  ];

  // 请求拦截器往前面放，这也是为什么请求拦截器后声明的先执行
  this.interceptors.request.forEach((interceptor) => {
    chain.unshift(interceptor);
  });
  // 响应拦截器往后面放。这也是为什么响应拦截器后声明的后执行
  this.interceptors.respond.forEach((interceptor) => {
    chain.push(interceptor);
  });
  // 创建一个prmoise出来
  let promise = Promise.resolve(config);
  // 开始链式调用，这也是为什么请求/响应拦截必须返回config或者data
  while (chain.length) {
    const { resolve, reject } = chain.shift()!;
    promise = promise.then(resolve, reject);
  }

  return promise;
};

// 微信小程序method 的合法值
const methodList = [
  "options",
  "get",
  "head",
  "post",
  "put",
  "delete",
  "trace",
  "connect",
  "download",
  "upload"
];

methodList.forEach((method) => {
  Request.prototype[method] = function (url, config = {}) {
    return this._request(method, url, config);
  };
});

Request.prototype._request = function (method, url, config) {
  return this.request(
    Object.assign(config || {}, {
      method,
      url
    })
  );
};
