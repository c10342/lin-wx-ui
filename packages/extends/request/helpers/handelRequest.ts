import {
  DownloadRequestConfig,
  RequestConfig,
  Respond,
  RespondData,
  UploadRequestConfig
} from "../types";
import { createError } from "./error";

// 处理响应
export function handelResponse({
  res,
  resolve,
  reject,
  config,
  request
}: Respond & { res: RespondData; resolve: Function; reject: Function }) {
  const response = {
    data: res,
    status: res.statusCode,
    statusText: res.errMsg,
    config,
    request
  };
  const { validateStatus } = config;
  if (!validateStatus || validateStatus(response)) {
    // 没有传入validateStatus（这个有默认的）或者 validateStatus返回true，则说明是成功的请求
    resolve(response);
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}`,
        config,
        response.statusText || "error",
        request,
        res
      )
    );
  }
}

// 监听取消请求
export function handelCancel({
  config,
  request,
  reject
}: {
  config: RequestConfig;
  request: WechatMiniprogram.RequestTask;
  reject: Function;
}) {
  const { cancelToken } = config;
  if (cancelToken) {
    // 调用then方法，一旦外部resolve，就会走then方法，然后取消请求
    cancelToken.promise.then((reason) => {
      if (request) {
        request.abort(); // 取消请求
      }
      reject(reason);
    });
  }
}

// 处理请求错误
export function handelFail({
  reject,
  config,
  request,
  error
}: {
  error: WechatMiniprogram.GeneralCallbackResult;
  reject: Function;
  config: RequestConfig;
  request: WechatMiniprogram.RequestTask;
}) {
  reject(createError(error.errMsg, config, "error", request));
}

interface UpAndDownRequestData {
  url: string;
  filePath: string;
  name: string;
  timeout?: number;
  header?: any;
  formData?: any;
}

export function handelUpAndDownRequestData({
  config
}: {
  config: UploadRequestConfig | DownloadRequestConfig;
}): UpAndDownRequestData {
  // 微信小程序wx.uploadFile和wx.downloadFile支持的参数列表
  const dataArr = ["url", "filePath", "name", "timeout"];
  const params: any = {};

  if (typeof config.headers !== "undefined") {
    // 微信小程序是header
    params.header = config.headers;
  }

  if (typeof config.data !== "undefined") {
    // 统一请求数据为data
    params.formData = config.data;
  }

  dataArr.forEach((key) => {
    if (typeof config[key] !== "undefined") {
      params[key] = config[key];
    }
  });
  return params;
}
