import { createError } from '../helpers/error';

export default function xhr(config) {
  return new Promise((resolve, reject) => {
    const { cancelToken, validateStatus } = config;

    const params = handelRequestData();

    processCancel();
    const request = wx.request({
      ...params,
      success(res) {
        const response = {
          ...res,
          config,
          request
        };
        handelResponse(response);
      },
      fail() {
        reject(createError('fail', config, 'error', request));
      }
    });

    // 处理响应
    function handelResponse(res) {
      if (!validateStatus || validateStatus(res)) {
        resolve(res);
      } else {
        reject(
          createError(
            `Request failed with status code ${res.statusCode}`,
            config,
            'error',
            request,
            res
          )
        );
      }
    }

    // 取消请求
    function processCancel() {
      if (cancelToken && request) {
        cancelToken.promise.then((reason) => {
          request.abort(); // 取消请求
          reject(reason);
        });
      }
    }

    // 处理请求数据
    function handelRequestData() {
      const dataArr = [
        'url',
        'data',
        'timeout',
        'dataType',
        'responseType',
        'enableHttp2',
        'enableQuic',
        'enableCache'
      ];
      const params = {
        method: 'GET'
      };

      if (typeof config.headers !== 'undefined') {
        params.header = config.headers;
      }
      if (typeof config.method !== 'undefined') {
        params.method = config.method.toLocaleUpperCase();
      }
      dataArr.forEach((key) => {
        if (typeof config[key] !== 'undefined') {
          params[key] = config[key];
        }
      });
      return params;
    }
  });
}
