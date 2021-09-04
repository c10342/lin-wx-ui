import { isAbsoluteURL, combineURL } from '../helpers/utils';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';

export default function dispatchRequest(config) {
  // 发送请求前先检查是否取消过请求
  throwIfCancellationRequested(config);
  // 先处理一下config配置
  processConfig(config);
  const requestFn = config.adapter(config);
  if (!requestFn) {
    // 请求方法不存在，也就是适配器不存在
    return Promise.reject(new ReferenceError('adapter is undefined'));
  }

  // 进行请求
  return requestFn(config).then(
    (res) => transformResponseData(res), // 转换响应数据
    (error) => Promise.reject(error)
  );
}

// 已经取消过请求就不用在次发送请求了
function throwIfCancellationRequested(config) {
  if (config.canceltoken) {
    config.canceltoken.throwIfRequested();
  }
}

/**
 * 构建请求url
 *
 * @param {} config
 * @returns {}
 */
export function transformURL(config) {
  let { url, baseURL } = config;
  if (baseURL && !isAbsoluteURL(url)) {
    url = combineURL(baseURL, url);
  }
  return url;
}

/**
 * 处理配置
 *
 * @param {} config
 */
function processConfig(config) {
  // 请求处理url
  config.url = transformURL(config);

  // 转换请求数据，默认不做处理，给什么数据就返回什么数据，用户可自定义转换数据方法
  config.data = transform(config.data, config.headers, config.transformRequest);

  // 合并默认配置headers和用户输入的配置headers
  const result = flattenHeaders(config.headers, config.method);
  if (result) {
    config.headers = result;
  }
}

/**
 * 转化响应数据
 *
 * @param {} res
 * @returns {}
 */
function transformResponseData(res) {
  // 默认不做处理，给什么数据就返回什么数据，用户可自定义
  // 这里注意一下，微信小程序返回来的是header，不是headers，少了个s
  res.data = transform(res.data, res.header, res.config.transformRespond);
  return res;
}
