const markdown = `
# 介绍
Request 网络请求是一个基于 promise 的 HTTP 库，参考\`request\`源码的设计思想,特点如下：
- 基于\`wx.request\`,\`wx.downloadFile\`和\`wx.uploadFile\`封装的 Http 库
- 支持\`Promise\`API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据

# 引用
\`\`\`javascript
import request from 'path/to/dist/extends/request/index';
\`\`\`

# 创建请求

- \`request(config)\` 或者 \`request(url[, config])\`：根据配置创建请求
- \`request.request(config)\` 或者 \`request.request(url[, config])\`：同上
- \`request.options(url[, config])\`：options请求
- \`request.get(url[, config])\`：get请求
- \`request.head(url[, config])\`：head请求
- \`request.post(url[, config])\`：post请求
- \`request.put(url[, config])\`：put请求
- \`request.delete(url[, config])\`：delete请求
- \`request.trace(url[, config])\`：trace请求
- \`request.connect(url[, config])\`：connect请求
- \`request.download(url[, config])\`：下载文件
- \`request.upload(url[, config])\`：上传文件

# 自定义实例默认值
\`\`\`javascript
// 创建实例时设置配置的默认值
var instance = request.create({
  baseURL: 'xxx'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
\`\`\`

# 拦截器
在请求或响应被 \`then\` 或 \`catch\` 处理前拦截它们。
\`\`\`javascript
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
\`\`\`
如果你想在稍后移除拦截器，可以这样：
\`\`\`javascript
const myInterceptor = request.interceptors.request.use(function () {/*...*/});
request.interceptors.request.eject(myInterceptor);
\`\`\`

# 取消请求
通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：
\`\`\`javascript
var CancelToken = request.CancelToken;
var cancel;

request.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
\`\`\`

更多详细的例子，用法，配置，方法，请查看web端文档！！！

`;

export default markdown;
