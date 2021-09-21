# 快速上手

---

## 引入组件

以 `Button` 组件为例，只需要在 `app.json` 或 `index.json` 中配置 `Button` 对应的路径即可。如果你是通过下载源代码的方式使用 `lin-wx-ui`，请将路径修改为项目中 `lin-wx-ui` 所在的目录。

```json
// 通过 npm 安装
// app.json
"usingComponents": {
  "lin-button": "lin-wx-ui/button/index"
}
```
```json
// 通过下载源码使用
// app.json
"usingComponents": {
  "lin-button": "path/to/dist/button/index"
}
```


## 使用组件

```html
<lin-button type="primary">按钮</lin-button>
```


## 其他

在开发者工具中预览示例小程序

```bash
# 将项目克隆到本地

git clone https://github.com/c10342/lin-wx-ui.git
```

```bash
# 安装项目依赖

cd lin-wx-ui && npm install
```

```bash
# 执行组件编译

npm run dev
```

接着打开微信开发者工具，导入examples目录的项目就可以预览示例了。
