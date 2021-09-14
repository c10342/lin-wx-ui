import { getDefaultAdapter } from "./helpers/utils";

const okErrMsg = ["request:ok", "downloadFile:ok", "uploadFile:ok"];

// 默认配置
const defaults = {
  // 创建请求时使用的方法。
  method: "get",

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  timeout: 0,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
  // 否则，promise 将被 rejecte
  validateStatus: function (respond) {
    return respond.status === 200 && okErrMsg.includes(respond.statusText);
  },

  // 允许在向服务器发送前，修改请求数据
  transformRequest: [
    // data, headers
    function (data) {
      return data;
    }
  ],

  // 在传递给 then/catch 前，允许修改响应数据
  transformRespond: [
    function (data) {
      return data;
    }
  ],

  // 适配器，根据适配器派发请求
  adapter: getDefaultAdapter

  // 即将被发送的自定义请求头
  // headers: {
  //   // 每个请求都带上common里面的key-val
  //   common: { a: '1' },
  //   // get请求都带上里面的key-val
  //   get:{},
  //   post:{}
  // },

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 request 实例的方法传递相对 URL
  // baseURL: 'https://some-domain.com/api/',

  // `data` 是即将与请求一起发送请求参数。method='download' 时无效
  // data: {
  //   ID: 12345
  // },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  // cancelToken: new CancelToken(function (cancel) {
  // }),

  // 返回的数据格式,合法值为json和其他(不对返回的内容进行 JSON.parse)。method!='download'||'upload' 时有效
  // dataType:"json",

  // 响应的数据类型,合法值为text和arraybuffer。method!='download'||'upload' 时有效
  // responseType:"text",

  // 是否开启 http2。method!='download'||'upload' 时有效
  // enableHttp2:false,

  // 是否开启 quic。method!='download'||'upload' 时有效
  // enableQuic:false,

  // 是否开启 cache。method!='download'||'upload' 时有效
  // enableCache:false,

  // 上传处理进度事件。method='upload' 时有效
  // onUploadProgress:(res)=>{},

  // 下载处理进度事件。method='download' 时有效
  // onDownloadProgress:(res)=>{},

  // 下载时为文件下载后存储的路径 (本地路径)，上传时为上传文件资源的路径 (本地路径)。method='upload' | 'download' 时有效
  // filePath:'xxx',

  // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容。 method='upload' 时有效
  // name:'xx',
};

export default defaults;
