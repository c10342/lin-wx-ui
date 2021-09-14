import {
  handelResponse,
  handelCancel,
  handelFail,
  handelUpAndDownRequestData
} from "../helpers/handelRequest";
export default function download(config) {
  return new Promise((resolve, reject) => {
    const { onDownloadProgress } = config;
    // 先处理一下请求数据
    const params = handelUpAndDownRequestData({ config });
    const request = wx.downloadFile(
      Object.assign(Object.assign({}, params), {
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
      })
    );
    handelCancel({
      config,
      request,
      reject
    });
    handelDownloadProgress();
    // 监听下载进度
    function handelDownloadProgress() {
      if (typeof onDownloadProgress === "function" && request) {
        request.onProgressUpdate(onDownloadProgress);
      }
    }
  });
}
