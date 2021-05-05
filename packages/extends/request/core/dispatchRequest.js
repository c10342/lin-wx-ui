import { isAbsoluteURL, combineURL } from '../helpers/utils';
import { flattenHeaders } from '../helpers/headers';
import xhr from './xhr';

export default function dispatchRequest(config) {
  // 发送请求前先检查是否取消过请求
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config);
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

  // 合并默认配置headers和用户输入的配置headers
  const result = flattenHeaders(config.headers, config.method);
  if (result) {
    config.headers = result;
  }
}
