---
pageClass: component-page-class
---



# Icon 图标

---


<demo-image src='/componentImage/basic/icon.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-icon": "/dist/icon/index"
}
```

## 基础图标

::: details 代码示例

```html
<lin-icon size="30px" icon="{ {item}}" wx:for="{ {iconList}}" wx:key="item" />
```

```javascript
Page({
  data: {
    iconList: [
      "arrow-right",
      "arrow-left",
      "arrow-down",
      "arrow-up",
      "password",
      "eye",
      "like",
      "search",
      "loading",
      "delete",
      "star",
      "phone",
      "user",
      "setting",
      "upload",
      "close",
      "uparrow",
      "downarrow",
      "leftarrow",
      "rightarrow",
      "round",
      "round-active",
      "square",
      "square-active",
      "star1-o",
      "star1",
      "like1",
      "like1-o",
      "error",
      "file",
      "add",
      "camera",
      "qrcode",
      "link",
      "wechat",
      "qq",
      "weibo",
      "gou",
      "pic",
      "success",
      "fail",
      "cart-o",
      "shop-o",
      "chat-o",
    ],
  },
});
```

:::

## 主题风格

支持`default`、`primary`、`info`、`warning`、`danger`、`success`六种类型，默认为`default`

::: details 代码示例

```html
<lin-icon size="30px" icon="setting" type="default" />
<lin-icon size="30px" icon="setting" type="primary" />
<lin-icon size="30px" icon="setting" type="info" />
<lin-icon size="30px" icon="setting" type="warning" />
<lin-icon size="30px" icon="setting" type="danger" />
```

:::

## 不同尺寸

通过`size`属性设置不同尺寸

::: details 代码示例

```html
<lin-icon icon="setting" size="20px" />
<lin-icon icon="setting" size="25px" />
<lin-icon icon="setting" size="30px" />
<lin-icon icon="setting" size="40px" />
<lin-icon icon="setting" size="45px" />
```

:::

## 不同颜色

通过`color`属性图标颜色

::: details 代码示例

```html
<lin-icon size="30px" color="red" icon="setting" />
<lin-icon size="30px" color="green" icon="setting" />
```

:::

## 属性

| 参数  | 说明     | 类型          | 可选值                                                       | 默认值  |
| ----- | -------- | ------------- | ------------------------------------------------------------ | ------- |
| icon  | 图标名称 | String        | —                                                            | —       |
| type  | 图标类型 | String        | `default`, `primary`, `info`, `warning`, `danger`, `success` | default |
| size  | 图标大小 | String,Number | —                                                            | —       |
| color | 图标颜色 | String        | —                                                            | —       |

## 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
