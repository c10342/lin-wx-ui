import {
  handelResponse,
  handelCancel,
  handelFail,
  handelUpAndDownRequestData
} from "../helpers/handelRequest";
import { UploadRequestConfig } from "../types";

export default function upload(config: UploadRequestConfig) {
  return new Promise((resolve, reject) => {
    const { onUploadProgress } = config;
    // 先处理一下请求数据
    const params = handelUpAndDownRequestData({ config });

    const request = wx.uploadFile({
      ...params,
      success(res) {
        handelResponse({
          res,
          config,
          request,
          resolve,
          reject
        } as any);
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

    handelUploadProgress();

    // 监听上传进度
    function handelUploadProgress() {
      if (typeof onUploadProgress === "function" && request) {
        request.onProgressUpdate(onUploadProgress);
      }
    }
  });
}
