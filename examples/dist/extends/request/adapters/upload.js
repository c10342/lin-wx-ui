import {
  handelResponse,
  handelCancel,
  handelFail,
  handelUpAndDownRequestData
} from "../helpers/handelRequest";
export default function upload(config) {
  return new Promise((resolve, reject) => {
    const { onUploadProgress } = config;
    // 先处理一下请求数据
    const params = handelUpAndDownRequestData({ config });
    const request = wx.uploadFile(
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
    handelUploadProgress();
    // 监听上传进度
    function handelUploadProgress() {
      if (typeof onUploadProgress === "function" && request) {
        request.onProgressUpdate(onUploadProgress);
      }
    }
  });
}
