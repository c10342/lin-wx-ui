// 默认配置
const defaults = {
  // 创建请求时使用的方法
  method: 'get',

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  timeout: 0,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
  // 否则，promise 将被 rejecte
  validateStatus: function (respond) {
    return respond.statusCode === 200 && respond.errMsg === 'request:ok';
  },

  // 允许在向服务器发送前，修改请求数据
  transformRequest: [
    function (data, headers) {
      return data;
    }
  ],

  // 在传递给 then/catch 前，允许修改响应数据
  transformRespond: [
    function (data) {
      return data;
    }
  ]

  // 即将被发送的自定义请求头
  // headers: {
  //   // 每个请求都带上common里面的key-val
  //   common: { a: '1' }
  // },

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 request 实例的方法传递相对 URL
  // baseURL: 'https://some-domain.com/api/',

  // `data` 是即将与请求一起发送请求参数
  // data: {
  //   ID: 12345
  // },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  // cancelToken: new CancelToken(function (cancel) {
  // }),

  // 返回的数据格式,合法值为json和其他(不对返回的内容进行 JSON.parse)
  // dataType:"json",

  // 响应的数据类型,合法值为text和arraybuffer
  // responseType:"text",

  // 是否开启 http2
  // enableHttp2:false,

  // 是否开启 quic
  // enableQuic:false,

  // 是否开启 cache
  // enableCache:false,
};

export default defaults;
