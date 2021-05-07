import { createError } from '../helpers/error';

export default function xhr(config) {
  return new Promise((resolve, reject) => {
    // cancelToken取消请求的实例
    // validateStatus校验成功状态的函数
    const { cancelToken, validateStatus } = config;
    // 先处理一下请求数据
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
        // 没有传入validateStatus（这个有默认的）或者 validateStatus返回true，则说明是成功的请求
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
      if (cancelToken) {
        // 调用then方法，一旦外部resolve，就会走then方法，然后取消请求
        cancelToken.promise.then((reason) => {
          request.abort(); // 取消请求
          reject(reason);
        });
      }
    }

    // 处理请求数据
    function handelRequestData() {
      // 微信小程序wx.request支持的参数列表
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
        // 微信小程序是header
        params.header = config.headers;
      }
      if (typeof config.method !== 'undefined') {
        // 微信小程序method需要大写
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
