<div align='center' >
<img alt="logo" src="https://wxui.linjiafu.top/static/images/logo.png" style="margin-bottom: 10px;"/>
<h1 style='font-weight: 700'>轻量、灵活的微信小程序组件</h1>
</div>

<p align="center">
    <a href="https://www.npmjs.org/package/lin-wx-ui">
    <img src="https://img.shields.io/npm/v/lin-wx-ui.svg"/>
  </a>
    <a href="https://npmcharts.com/compare/lin-wx-ui?minimal=true">
    <img src="http://img.shields.io/npm/dm/lin-wx-ui.svg"/>
  </a>
    <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  </a>
</p>

## 在线文档

[https://wxui.linjiafu.top](https://wxui.linjiafu.top)

## 简介

`lin-wx-ui` 是一款基于 `原生微信小程序` 的前端 UI 组件库，主要集成了我平时在开发中使用到的 UI 组件

## 预览

扫描下方小程序二维码，体验组件库示例：
<img alt="qrcode" src="https://wxui.linjiafu.top/static/images/qrcode.jpg" style="margin-top: 10px;"/>

## 特性

- 基于 `原生微信小程序` 开发的 UI 组件
- 使用 npm + gulp 的工作流
- 提供友好的 API，可灵活的使用组件
- 支持按需引入，减少项目打包体积
- 偏向于业务组件
- 提供完善的文档

## 安装

### 方式一. 通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# 通过 npm 安装
npm i lin-wx-ui -S --production

# 通过 yarn 安装
yarn add lin-wx-ui --production

```

### 方式二. 下载代码

直接通过 git 下载 lin-wx-ui 源代码，并将`dist`目录拷贝到自己的项目中
```bash
git clone https://github.com/c10342/lin-wx-ui.git
```

## 使用组件

以按钮组件为例，只需要在 json 文件中引入按钮对应的自定义组件即可

```json
{
  "usingComponents": {
    "lin-button": "/path/to/lin-wx-ui/dist/button/index"
  }
}
```

接着就可以在 wxml 中直接使用组件

```html
<lin-button type="primary">按钮</van-button>
```

## 在开发者工具中预览

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
```

打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，把`lin-wx-ui/example`目录添加进去就可以预览示例了。


## 贡献

如果你在使用 `lin-wx-ui` 时遇到问题，或者有好的建议，欢迎给我提 [Issue](https://github.com/c10342/lin-wx-ui/issues)

## LICENSE

[MIT](LICENSE)
