const markdown = `
# 引入
\`\`\`javascript
import request from 'path/to/dist/extends/request/index';
\`\`\`

# request API
可以通过向 \`request\` 传递相关配置来创建请求
- \`request(config)\`
\`\`\`javascript
// 发送 POST 请求
request({
  method: 'post',
  url: '/login',
  data: {
    name:'李四',
    age:18
  }
});
\`\`\`
- \`request(url[, config])\`
\`\`\`javascript
// 发送 GET 请求（默认的方法）
request('/login');
\`\`\`

# 请求方法的别名
为方便起见，为所有支持的请求方法提供了别名
\`\`\`javascript
request.request(url[, config])

request[method](url[, config])
\`\`\`
method支持的值有：\`options\`，\`get\`，\`head\`，\`post\`，\`put\`，\`delete\`，\`trace\`，\`connect\`

# 并发
处理并发请求的助手函数
\`\`\`javascript
request.all(iterable)

request.spread(callback)
\`\`\`

# 创建实例
可以使用自定义配置新建一个 request 实例
\`request.create([config])\`
\`\`\`javascript
const instance = request.create({
  baseURL: 'https://xxxx',
  timeout: 1000
});
\`\`\`
注意：通过\`request.create([config])\`创建出来的实例不包含以下方法和属性：\`request.create\`，\`request.CancelToken\`，\`request.Cancel\`，\`request.isCancel\`，\`request.all\`，\`request.spread\`，\`request.Request\`
`;

export default markdown;
