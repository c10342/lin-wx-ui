import { isFunction } from "./is";

type RequestOptions = WechatMiniprogram.RequestOption & {
  completeCallback?: Function;
};

// 封装请求方法
const baseRequest = ({
  url,
  data = {},
  header = {},
  timeout,
  method = "GET",
  dataType = "json",
  responseType = "text",
  enableHttp2 = false,
  enableQuic = false,
  enableCache = false,
  completeCallback
}: RequestOptions) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      timeout,
      method,
      dataType,
      responseType,
      enableHttp2,
      enableQuic,
      enableCache,
      success(res) {
        if (res.statusCode === 200 && res.errMsg === "request:ok") {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      // reject,
      complete(resData) {
        if (isFunction(completeCallback)) {
          completeCallback(resData);
        }
      }
    });
  });
};

const request = {
  get(params: RequestOptions) {
    return baseRequest({
      ...params,
      method: "GET"
    });
  },
  post(params: RequestOptions) {
    return baseRequest({
      ...params,
      method: "POST"
    });
  }
};

export default request;
