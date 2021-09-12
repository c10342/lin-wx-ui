import {
  handelResponse,
  handelCancel,
  handelFail
} from "../helpers/handelRequest";

export default function xhr(config) {
  return new Promise((resolve, reject) => {
    // 先处理一下请求数据
    const params = handelRequestData();

    const request = wx.request({
      ...params,
      success(res) {
        handelResponse({
          res,
          config,
          request,
          resolve,
          reject
        });
      },
      fail(error) {
        handelFail({
          reject,
          config,
          request,
          error
        });
      }
    });

    handelCancel({
      config,
      request,
      reject
    });

    // 处理请求数据
    function handelRequestData() {
      // 微信小程序wx.request支持的参数列表
      const dataArr = [
        "url",
        "data",
        "timeout",
        "dataType",
        "responseType",
        "enableHttp2",
        "enableQuic",
        "enableCache"
      ];
      const params = {
        method: "GET"
      };

      if (typeof config.headers !== "undefined") {
        // 微信小程序是header
        params.header = config.headers;
      }
      if (typeof config.method !== "undefined") {
        // 微信小程序method需要大写
        params.method = config.method.toLocaleUpperCase();
      }
      dataArr.forEach((key) => {
        if (typeof config[key] !== "undefined") {
          params[key] = config[key];
        }
      });
      return params;
    }
  });
}
