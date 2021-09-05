import { isFunction } from "./is";
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
}) => {
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
  get(params) {
    return baseRequest(
      Object.assign(Object.assign({}, params), { method: "GET" })
    );
  },
  post(params) {
    return baseRequest(
      Object.assign(Object.assign({}, params), { method: "POST" })
    );
  }
};
export default request;
