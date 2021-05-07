// 默认配置
const defaults = {
  method: 'get',
  timeout: 0,
  validateStatus: function (respond) {
    return respond.statusCode === 200 && respond.errMsg === 'request:ok';
  },
  // headers: {
  //   // 每个请求都带上common里面的key-val
  //   common: { a: '1' }
  // },
  // 转换请求数据
  transformRequest: [
    function (data, headers) {
      return data;
    }
  ],
  // 转换响应数据
  transformRespond: [
    function (data) {
      return data;
    }
  ]
};

export default defaults;
