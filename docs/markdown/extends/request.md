# Request 网络请求

## 引入

在 index.js 中引入

```javascript
import request from 'xx/dist/extends/request/index';

Page({});
```

## 特性

- 基于`wx.request`,`wx.downloadFile`和`wx.uploadFile`封装的 Http 库
- 支持`Promise`API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据

## 案例

执行`get`请求

```javascript
request
  .get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
request
  .get('/user', {
    data: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行`post`请求

```javascript
request
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行多个并发请求

```javascript
function getUserAccount() {
  return request.get('/user/12345');
}

function getUserPermissions() {
  return request.get('/user/12345/permissions');
}

request.all([getUserAccount(), getUserPermissions()]).then(
  request.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  })
);
```

## request API

可以通过向 `request` 传递相关配置来创建请求

**request(config)**

```javascript
// 发送 POST 请求
request({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

**request(url[, config])**

```javascript
// 发送 GET 请求（默认的方法）
request('/user/12345');
```

## 请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

**request.request(config)**

**request.options(url[, config])**

**request.get(url[, config])**

**request.head(url[, config])**

**request.post(url[, config])**

**request.put(url[, config])**

**request.delete(url[, config])**

**request.trace(url[, config])**

**request.connect(url[, config])**

**request.download(url[, config])**

**request.upload(url[, config])**

**注意：**
`download`是用来下载文件的，`upload`是用来上传文件的

## 并发

处理并发请求的助手函数

**request.all(iterable)**

**request.spread(callback)**

## 创建实例

可以使用自定义配置新建一个 request 实例

**request.create([config])**

```javascript
const instance = request.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
```

## 实例方法

**request.request(config)**

**request.options(url[, config])**

**request.get(url[, config])**

**request.head(url[, config])**

**request.post(url[, config])**

**request.put(url[, config])**

**request.delete(url[, config])**

**request.trace(url[, config])**

**request.connect(url[, config])**

**request.download(url[, config])**

**request.upload(url[, config])**

## 响应结构

某个请求的响应包含以下信息

```javascript
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'request:ok',

   // `config` 是为请求提供的配置信息
  config: {},

 // 'request'
  request: {}
}
```

使用 then 时，你将接收下面这样的响应 :

```javascript
request.get('/user/12345').then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.config);
});
```

## 配置默认值

你可以指定将被用在各个请求的配置默认值

**全局的 request 默认值**

```javascript
request.defaults.baseURL = 'https://api.example.com';
request.defaults.headers.common['Authorization'] = AUTH_TOKEN;
request.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

**自定义实例默认值**

```javascript
const instance = request.create({
  baseURL: 'https://api.example.com'
});

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

## 配置的优先顺序

配置会以一个优先顺序进行合并。这个顺序是：在 `request/defaults.js` 找到的库的默认值，然后是实例的 `defaults` 属性，最后是请求的 `config` 参数。后者将优先于前者。这里是一个例子：

```javascript
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = request.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```

## 拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```javascript
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

如果你想在稍后移除拦截器，可以这样：

```javascript
const myInterceptor = request.interceptors.request.use(function () {
  /*...*/
});
request.interceptors.request.eject(myInterceptor);
```

## 错误处理

```javascript
request.get('/user/12345').catch(function (error) {
  console.log(error.config);
});
```

可以使用 `validateStatus` 配置选项定义一个自定义 HTTP 状态码的错误范围。

```javascript
request.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500;
  }
});
```

## 取消

使用 _cancel token_ 取消请求

可以使用 `CancelToken.source` 工厂方法创建 cancel token，像这样：

```javascript
const CancelToken = request.CancelToken;
const source = CancelToken.source();

request
  .get('/user/12345', {
    cancelToken: source.token
  })
  .catch(function (thrown) {
    if (request.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

request.post(
  '/user/12345',
  {
    name: 'new name'
  },
  {
    cancelToken: source.token
  }
);

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

```javascript
const CancelToken = request.CancelToken;
let cancel;

request.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

cancel();
```

## 请求配置

'options','get','head','post', 'put','delete','trace','connect','download','upload'

**通用配置**

| 字段名           | 说明                                                       | 类型                      | 默认值 |
| ---------------- | ---------------------------------------------------------- | ------------------------- | ------ |
| method           | 创建请求时使用的方法                                       | String                    | get    |
| timeout          | 指定请求超时的毫秒数(0 表示无超时时间)                     | Number                    | 0      |
| validateStatus   | 定义对于给定的 HTTP 响应状态码是 resolve 或 reject promise | Function                  | ()=>{} |
| transformRequest | 允许在向服务器发送前，修改请求数据                         | Function,Array<\Function> | []     |
| transformRespond | 在传递给 then/catch 前，允许修改响应数据                   | Function,Array<\Function> | []     |
| adapter          | 适配器，根据适配器派发请求                                 | Function                  | ()=>{} |
| headers          | 即将被发送的自定义请求头                                   | Object                    | ()=>{} |
| baseURL          | 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL           | String                    | —      |
| cancelToken      | 指定用于取消请求的 cancel token                            | cancelToken               | —      |

**method='options'|'get'|'head'|'post'| 'put'|'delete'|'trace'|'connect'支持的配置**

| 字段名       | 说明                                                               | 类型    | 默认值 |
| ------------ | ------------------------------------------------------------------ | ------- | ------ |
| data         | 即将与请求一起发送请求参数                                         | Object  | —      |
| dataType     | 返回的数据格式,合法值为 json 和其他(不对返回的内容进行 JSON.parse) | String  | json   |
| responseType | 响应的数据类型,合法值为 text 和 arraybuffer                        | String  | text   |
| enableHttp2  | 是否开启 http2                                                     | Boolean | false  |
| enableQuic   | 是否开启 quic                                                      | Boolean | false  |
| enableCache  | 是否开启 cache                                                     | Boolean | false  |

**method='download'支持的配置**

| 字段名             | 说明                            | 类型 | 默认值 |
| ------------------ | ------------------------------- | ---- | ------ |
| onDownloadProgress | 下载处理进度事件                | —    | —      |
| filePath           | 文件下载后存储的路径 (本地路径) | —    | —      |

**method='upload'支持的配置**

| 字段名           | 说明                                                                | 类型 | 默认值 |
| ---------------- | ------------------------------------------------------------------- | ---- | ------ |
| onUploadProgress | 上传处理进度事件                                                    | —    | —      |
| filePath         | 上传文件资源的路径                                                  | —    | —      |
| name             | 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 | —    | —      |

**headers 字段说明**

```javascript
  headers: {
    // 每个请求都带上common里面的key-val
    common: { a: '1' },
    // get请求都带上里面的key-val
    get:{},
    // post请求都带上里面的key-val
    post:{}
    // ...
  }
```
