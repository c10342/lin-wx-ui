import { deepMerge } from './utils';
/**
 * 处理headers
 * {
 *   headers:{
 *       common:{
 *           Accept:'application/x-www-form-urlencoded'
 *       }
 *       post:{
 *           test:'123'
 *       }
 *       delete:{
 *           test1:'333'
 *       }
 *   }
 * }
 *
 * post  => {
 *   headers:{
 *       Accept:'application/x-www-form-urlencoded'
 *       test:'123'
 *   }
 * }
 *
 *
 * @export
 * @param {*} headers
 * @param {*} method
 * @returns {*}
 */
export function flattenHeaders(headers, method) {
  if (!headers) {
    return headers;
  }
  headers = deepMerge(headers.common, headers[method], headers);

  // 需要从headers中删除的无用key
  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ];

  methodsToDelete.forEach((key) => {
    delete headers[key];
  });

  return headers;
}
