---
pageClass: component-page-class
---

# Button 按钮

---

<demo-image src='/componentImage/basic/button.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-button": "/dist/button/index"
}
```

## 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`、`success`六种类型，默认为`default`

::: details 代码示例

```html
<lin-button type="default">默认按钮</lin-button>
<lin-button type="primary">主要按钮</lin-button>
<lin-button type="info">信息按钮</lin-button>
<lin-button type="warning">警告按钮</lin-button>
<lin-button type="danger">危险按钮</lin-button>
<lin-button type="success">成功按钮</lin-button>
```

:::

## 朴素按钮

通过`plain`属性将按钮设置为朴素按钮

::: details 代码示例

```html
<lin-button plain type="default">朴素按钮</lin-button>
<lin-button plain type="primary">主要按钮</lin-button>
<lin-button plain type="success">成功按钮</lin-button>
<lin-button plain type="info">信息按钮</lin-button>
<lin-button plain type="warning">警告按钮</lin-button>
<lin-button plain type="danger">危险按钮</lin-button>
```

:::

## 圆角按钮

通过`round`属性将按钮设置为圆角按钮

::: details 代码示例

```html
<lin-button round type="default">圆形按钮</lin-button>
<lin-button round type="primary">主要按钮</lin-button>
<lin-button round type="success">成功按钮</lin-button>
<lin-button round type="info">信息按钮</lin-button>
<lin-button round type="warning">警告按钮</lin-button>
<lin-button round type="danger">危险按钮</lin-button>
```

:::

## 图标按钮

通过`icon`属性设置按钮图标，支持 Icon 组件里的所有图标

::: details 代码示例

```html
<lin-button icon="setting" type="default">设置</lin-button>
<lin-button icon="setting" type="primary">设置</lin-button>
<lin-button icon="setting" type="success">设置</lin-button>
<lin-button icon="setting" type="info">设置</lin-button>
<lin-button icon="setting" type="warning">设置</lin-button>
<lin-button icon="setting" type="danger">设置</lin-button>
```

:::

## 圆形按钮

通过`circle`属性将按钮设置为圆角按钮

::: details 代码示例

```html
<lin-button circle icon="setting" type="default">设置</lin-button>
<lin-button circle icon="setting" type="primary">设置</lin-button>
<lin-button circle icon="setting" type="success">设置</lin-button>
<lin-button circle icon="setting" type="info">设置</lin-button>
<lin-button circle icon="setting" type="warning">设置</lin-button>
<lin-button circle icon="setting" type="danger">设置</lin-button>
```

:::

## 加载状态

通过`loading`属性将按钮设置为加载状态

::: details 代码示例

```html
<lin-button type="primary" loading loadingColor="#fff"></lin-button>
<lin-button type="success" loading loadingColor="#fff"></lin-button>
<lin-button type="danger" loading loadingColor="#fff">加载</lin-button>
```

:::

## 禁用状态

通过`disabled`属性来禁用按钮，此时按钮的`bind:click`事件不会触发

::: details 代码示例

```html
<lin-button disabled type="default">按钮</lin-button>
<lin-button disabled type="primary">按钮</lin-button>
<lin-button disabled type="success">按钮</lin-button>
<lin-button disabled type="info">按钮</lin-button>
<lin-button disabled type="warning">按钮</lin-button>
<lin-button disabled type="danger">按钮</lin-button>
```

:::

## 自定义颜色

通过`color`属性可以自定义按钮的颜色

::: details 代码示例

```html
<lin-button color="#7232dd">单色按钮</lin-button>
<lin-button color="#7232dd" plain>单色按钮</lin-button>
<lin-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
  渐变色按钮
</lin-button>
```

:::

## 尺寸按钮

支持`default`、`medium`、`small`四种尺寸，默认为`default`

::: details 代码示例

```html
<lin-button size="default">大型按钮</lin-button>
<lin-button size="medium">默认尺寸</lin-button>
<lin-button size="small">小型按钮</lin-button>
```

:::

## 块级元素

通过`block`属性可以将按钮的元素类型设置为块级元素

::: details 代码示例

```html
<lin-button type="primary" block>块级元素</lin-button>
```

:::

## 属性

| 参数             | 说明                                                                                                                | 类型    | 可选值                                                       | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------ | ------------ |
| formType         | 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件                              | String  | —                                                            | —            |
| disabled         | 是否禁用按钮                                                                                                        | Boolean | —                                                            | false        |
| block            | 是否为块级元素                                                                                                      | Boolean | —                                                            | false        |
| type             | 按钮类型                                                                                                            | String  | `primary`, `success`, `info`, `warning`, `danger`, `default` | default      |
| plain            | 是否为朴素按钮                                                                                                      | Boolean | —                                                            | false        |
| round            | 是否为圆角按钮                                                                                                      | Boolean | —                                                            | false        |
| circle           | 是否为圆形按钮                                                                                                      | Boolean | —                                                            | false        |
| icon             | 左侧图标名                                                                                                          | String  | —                                                            | —            |
| size             | 按钮尺寸                                                                                                            | String  | `default`,`medium`,`small`                                   | default      |
| iconSize         | 图标大小                                                                                                            | String  | —                                                            | —            |
| loading          | 是否显示为加载状态                                                                                                  | Boolean | —                                                            | false        |
| loadingColor     | 加载图标颜色                                                                                                        | String  | —                                                            | —            |
| loadingSize      | 加载图标大小                                                                                                        | String  | —                                                            | —            |
| dataset          | 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值   | any     | —                                                            | —            |
| color            | 按钮颜色，支持传入 linear-gradient 渐变色                                                                           | String  | —                                                            | —            |
| id               | 标识符                                                                                                              | String  | —                                                            | —            |
| lang             | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                     | String  | —                                                            | en           |
| businessId       | 客服消息子商户 id                                                                                                   | Number  | —                                                            | —            |
| sessionFrom      | 会话来源                                                                                                            | String  | —                                                            | —            |
| sendMessageTitle | 会话内消息卡片标题                                                                                                  | String  | —                                                            | 当前标题     |
| sendMessagePath  | 会话内消息卡片点击跳转小程序路径                                                                                    | String  | —                                                            | 当前分享路径 |
| sendMessageImg   | sendMessageImg                                                                                                      | String  | —                                                            | 截图         |
| showMessageCard  | 显示会话内消息卡片                                                                                                  | Boolean | —                                                            | false        |
| appParameter     | 打开 APP 时，向 APP 传递的参数                                                                                      | String  | —                                                            | —            |
| openType         | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | String  | —                                                            | —            |

## 事件

| 事件名              | 说明                                                                                        | 参数  |
| ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| bind:click          | 点击按钮，且按钮状态不为加载或禁用时触发                                                    | event |
| bind:getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo | event |
| bind:contact        | 客服消息回调                                                                                | event |
| bind:getphonenumber | 获取用户手机号回调                                                                          | event |
| bind:error          | 当使用开放能力时，发生错误的回调                                                            | event |
| bind:opensetting    | 在打开授权设置页后回调                                                                      | event |
| bind:launchapp      | 打开 APP 成功的回调                                                                         | event |

## 外部样式类

| 类名          | 说明               |
| ------------- | ------------------ |
| custom-class  | 根节点样式类       |
| loading-class | 加载图标样式类     |
| icon-class    | 图标样式类         |
| hover-class   | 按钮按下去的样式类 |
