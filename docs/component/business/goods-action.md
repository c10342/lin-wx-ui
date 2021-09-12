---
pageClass: component-page-class
---

# GoodsAction 商品导航

---

<demo-image src='/componentImage/business/goods-action.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
   "lin-goods-action": "/dist/GoodsAction/index",
   "lin-goods-action-icon": "/dist/GoodsActionIcon/index",
   "lin-goods-action-button": "/dist/GoodsActionButton/index"
}
```

## 基础用法

::: details 代码示例

```html
<lin-goods-action safeAreaInsetBottom='{ {false}}'>
  <lin-goods-action-icon icon="chat-o" text="客服" bind:click="onClickIcon" />
  <lin-goods-action-icon icon="cart-o" text="购物车" bind:click="onClickIcon" />
  <lin-goods-action-button
    text="加入购物车"
    type="warning"
    bind:click="onClickButton"
  />
  <lin-goods-action-button text="立即购买" bind:click="onClickButton" />
</lin-goods-action>
```

```javascript
Page({
  onClickIcon() {
    wx.showToast({
      title: "点击图标",
      icon: "none",
    });
  },
  onClickButton() {
    wx.showToast({
      title: "点击按钮",
      icon: "none",
    });
  },
});
```

:::

## 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标

::: details 代码示例

```html
<lin-goods-action safeAreaInsetBottom='{ {false}}'>
  <lin-goods-action-icon
    bind:click="onClickIcon"
    icon="chat-o"
    text="客服"
    dot
  />
  <lin-goods-action-icon
    bind:click="onClickIcon"
    icon="cart-o"
    text="购物车"
    info="5"
  />
  <lin-goods-action-icon bind:click="onClickIcon" icon="shop-o" text="店铺" />
  <lin-goods-action-button
    bind:click="onClickButton"
    text="加入购物车"
    type="warning"
  />
  <lin-goods-action-button bind:click="onClickButton" text="立即购买" />
</lin-goods-action>
```

```javascript
Page({
  onClickIcon() {
    wx.showToast({
      title: "点击图标",
      icon: "none",
    });
  },
  onClickButton() {
    wx.showToast({
      title: "点击按钮",
      icon: "none",
    });
  },
});
```

:::

## 自定义按钮颜色

通过`color`属性可以自定义按钮的颜色

::: details 代码示例

```html
<lin-goods-action safeAreaInsetBottom='{ {false}}'>
  <lin-goods-action-icon bind:click="onClickIcon" icon="chat-o" text="客服" />
  <lin-goods-action-icon
    bind:click="onClickIcon"
    icon="cart-o"
    text="购物车"
    info="5"
  />
  <lin-goods-action-icon bind:click="onClickIcon" icon="shop-o" text="店铺" />
  <lin-goods-action-button
    bind:click="onClickButton"
    color="#be99ff"
    text="加入购物车"
    type="warning"
  />
  <lin-goods-action-button
    bind:click="onClickButton"
    color="#7232dd"
    text="立即购买"
  />
</lin-goods-action>
```

```javascript
Page({
  onClickIcon() {
    wx.showToast({
      title: "点击图标",
      icon: "none",
    });
  },
  onClickButton() {
    wx.showToast({
      title: "点击按钮",
      icon: "none",
    });
  },
});
```

:::

## 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色

::: details 代码示例

```html
<lin-goods-action safeAreaInsetBottom='{ {false}}'>
  <lin-goods-action-icon bind:click="onClickIcon" icon="chat-o" text="客服" />
  <lin-goods-action-icon
    bind:click="onClickIcon"
    icon="cart-o"
    text="购物车"
    info="5"
  />
  <lin-goods-action-icon bind:click="onClickIcon" icon="shop-o" text="店铺" />
  <lin-goods-action-button
    bind:click="onClickButton"
    color="#7232dd"
    text="加入购物"
    type="warning"
  />
  <lin-goods-action-button
    bind:click="onClickButton"
    plain
    color="#7232dd"
    text="立即购买"
  />
</lin-goods-action>
```

```javascript
Page({
  onClickIcon() {
    wx.showToast({
      title: "点击图标",
      icon: "none",
    });
  },
  onClickButton() {
    wx.showToast({
      title: "点击按钮",
      icon: "none",
    });
  },
});
```

:::

## GoodsAction 属性

| 参数                | 说明                            | 类型    | 可选值 | 默认值 |
| ------------------- | ------------------------------- | ------- | ------ | ------ |
| safeAreaInsetBottom | 是否为 iPhoneX 留出底部安全距离 | Boolean | —      | true   |

## GoodsAction 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

## GoodsActionIcon 属性

| 参数             | 说明                                                                                                                | 类型           | 可选值                                              | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------- | ------------ |
| text             | 按钮文字                                                                                                            | String         | —                                                   | —            |
| icon             | 图标名称                                                                                                            | String         | —                                                   | —            |
| info             | 图标右上角提示信息                                                                                                  | String, Number | —                                                   | —            |
| dot              | 是否显示右上角小红点                                                                                                | Boolean        | —                                                   | false        |
| url              | 点击后跳转的链接地址                                                                                                | String         | —                                                   | —            |
| loading          | 是否显示为加载状态                                                                                                  | Boolean        | —                                                   | false        |
| disabled         | 是否禁用按钮                                                                                                        | Boolean        | —                                                   | false        |
| linkType         | 链接跳转类型                                                                                                        | String         | `navigateTo`, `redirectTo`, `switchTab`, `reLaunch` | navigateTo   |
| id               | 标识符                                                                                                              | String         | —                                                   | —            |
| lang             | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                     | String         | —                                                   | en           |
| businessId       | 客服消息子商户 id                                                                                                   | Number         | —                                                   | —            |
| sessionFrom      | 会话来源                                                                                                            | String         | —                                                   | —            |
| sendMessageTitle | 会话内消息卡片标题                                                                                                  | String         | —                                                   | 当前标题     |
| sendMessagePath  | 会话内消息卡片点击跳转小程序路径                                                                                    | String         | —                                                   | 当前分享路径 |
| sendMessageImg   | sendMessageImg                                                                                                      | String         | —                                                   | 截图         |
| showMessageCard  | 显示会话内消息卡片                                                                                                  | Boolean        | —                                                   | false        |
| appParameter     | 打开 APP 时，向 APP 传递的参数                                                                                      | String         | —                                                   | —            |
| openType         | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | String         | —                                                   | —            |

## GoodsActionIcon 事件

| 事件名              | 说明                                                                                        | 参数  |
| ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| bind:click          | 按钮点击事件回调                                                                            | —     |
| bind:getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo | event |
| bind:contact        | 客服消息回调                                                                                | event |
| bind:getphonenumber | 获取用户手机号回调                                                                          | event |
| bind:error          | 当使用开放能力时，发生错误的回调                                                            | event |
| bind:opensetting    | 在打开授权设置页后回调                                                                      | event |
| bind:launchapp      | 打开 APP 成功的回调                                                                         | event |

## GoodsActionIcon 插槽

| 插槽名称 | 说明       |
| -------- | ---------- |
| icon     | 自定义图标 |

## GoodsActionIcon 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
| icon-class   | 图标样式类   |
| text-class   | 文本样式类   |

## GoodsActionButton 属性

| 参数             | 说明                                                                                                                | 类型    | 可选值                                                                  | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------- | ------------ |
| text             | 按钮文字                                                                                                            | String  | —                                                                       | —            |
| color            | 按钮颜色                                                                                                            | String  | —                                                                       | —            |
| loading          | 是否显示为加载状态                                                                                                  | Boolean | —                                                                       | false        |
| disabled         | 是否禁用按钮                                                                                                        | Boolean | —                                                                       | false        |
| plain            | 是否为朴素按钮                                                                                                      | Boolean | —                                                                       | false        |
| type             | 按钮类型                                                                                                            | String  | `primary`, `success`, `info`, `warning`, `danger`, `default`, `success` | danger       |
| url              | 点击后跳转的链接地址                                                                                                | String  | —                                                                       | danger       |
| linkType         | 链接跳转类型                                                                                                        | String  | `navigateTo`, `redirectTo`, `switchTab`, `reLaunch`                     | navigateTo   |
| id               | 标识符                                                                                                              | String  | —                                                                       | —            |
| lang             | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                     | String  | —                                                                       | en           |
| businessId       | 客服消息子商户 id                                                                                                   | Number  | —                                                                       | —            |
| sessionFrom      | 会话来源                                                                                                            | String  | —                                                                       | —            |
| sendMessageTitle | 会话内消息卡片标题                                                                                                  | String  | —                                                                       | 当前标题     |
| sendMessagePath  | 会话内消息卡片点击跳转小程序路径                                                                                    | String  | —                                                                       | 当前分享路径 |
| sendMessageImg   | sendMessageImg                                                                                                      | String  | —                                                                       | 截图         |
| showMessageCard  | 显示会话内消息卡片                                                                                                  | Boolean | —                                                                       | false        |
| appParameter     | 打开 APP 时，向 APP 传递的参数                                                                                      | String  | —                                                                       | —            |
| openType         | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | String  | —                                                                       | —            |

## GoodsActionButton 事件

| 事件名              | 说明                                                                                        | 参数  |
| ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| bind:click          | 按钮点击事件回调                                                                            | —     |
| bind:getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo | event |
| bind:contact        | 客服消息回调                                                                                | event |
| bind:getphonenumber | 获取用户手机号回调                                                                          | event |
| bind:error          | 当使用开放能力时，发生错误的回调                                                            | event |
| bind:opensetting    | 在打开授权设置页后回调                                                                      | event |
| bind:launchapp      | 打开 APP 成功的回调                                                                         | event |

## GoodsActionButton 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
