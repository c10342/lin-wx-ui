// interface File {
//     path: string; // 上传临时地址
//     url: string; // 上传临时地址
//     size: number; // 上传大小
//     name: string; // 上传文件名称，accept="image" 不存在
//     type: string; // 上传类型，accept="image" 不存在
//     time: number; // 上传时间，accept="image" 不存在
//     image: boolean; // 是否为图片
//   }
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

// 判断是否为图片地址
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

// 判断是否为图片类型文件
export function isImageFile(item) {
  if (item.type) {
    return item.type === "image";
  }
  if (item.path) {
    return isImageUrl(item.path);
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  return false;
}

// 选择文件
export function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount
}) {
  switch (accept) {
    case "image":
      return new Promise((resolve, reject) => {
        // 从本地相册选择图片或使用相机拍照。
        wx.chooseImage({
          // 最多可以选择的图片张数
          count: multiple ? Math.min(maxCount, 9) : 1,
          // 选择图片的来源
          sourceType: capture,
          // 所选的图片的尺寸
          sizeType,
          success: resolve,
          fail: reject
        });
      });
    case "media":
      return new Promise((resolve, reject) => {
        // 拍摄或从手机相册中选择图片或视频。
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture, // 选择图片的来源，相册还是相机
          // 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间
          maxDuration,
          // 仅对 mediaType 为 image 时有效，是否压缩所选文件
          sizeType,
          // 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
          camera,
          success: resolve,
          fail: reject
        });
      });
    case "video":
      return new Promise((resolve, reject) => {
        // 拍摄视频或从手机相册中选视频。
        wx.chooseVideo({
          // 视频选择的来源
          sourceType: capture,
          // 是否压缩所选择的视频文件
          compressed,
          // 拍摄视频最长拍摄时间，单位秒
          maxDuration,
          // 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效
          camera,
          success: resolve,
          fail: reject
        });
      });
    default:
      return new Promise((resolve, reject) => {
        // 从客户端会话选择文件。
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
          // 所选的文件的类型
          type: "file",
          success: resolve,
          fail: reject
        });
      });
  }
}

// 是否为视频类型
export function isVideo(res, accept) {
  return accept === "video";
}

// 是否为函数
export function isFunction(val) {
  return typeof val === "function";
}

// 是否为对象
export function isObject(val) {
  return val != null && typeof val === "object";
}

// 是否为Promise实例
export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
