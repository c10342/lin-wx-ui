---
pageClass: component-page-class
---

# ActionSheet 上拉菜单

---

<demo-image src='/componentImage/feedback/action-sheet.gif' />


## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-action-sheet": "/dist/action-sheet/index"
}
```

## 基础用法

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell data-key="show1" title="基础用法" is-link bind:click="onClick" />
  <lin-cell
    title="展示取消按钮"
    data-key="show2"
    bind:click="onClick"
    is-link
  />
  <lin-cell
    title="展示描述信息"
    data-key="show3"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-action-sheet
  data-key="show1"
  show="{ { show1 }}"
  actions="{ { actions1 }}"
  bind:close="onClose"
  bind:select="onSelect"
/>
<lin-action-sheet
  cancel-text="取消"
  data-key="show2"
  show="{ { show2 }}"
  actions="{ { actions2 }}"
  bind:close="onClose"
  bind:cancel="onCancel"
  bind:select="onSelect"
/>

<lin-action-sheet
  description="这是一段描述信息"
  cancel-text="取消"
  data-key="show3"
  show="{ { show3 }}"
  actions="{ { actions3 }}"
  bind:close="onClose"
  bind:cancel="onCancel"
  bind:select="onSelect"
/>
```

```javascript
Page({
  data: {
    show1: false,
    actions1: [
      {
        name: "选项一",
      },
      {
        name: "选项二",
      },
      {
        name: "选项三",
      },
    ],
    show2: false,
    actions2: [
      {
        name: "选项一",
      },
      {
        name: "选项二",
      },
      {
        name: "选项三",
      },
    ],
    show3: false,
    actions3: [
      {
        name: "选项一",
      },
      {
        name: "选项二",
      },
      {
        name: "选项三",
        subname: "描述信息",
      },
    ],
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onCancel(event) {
    const key = event.currentTarget.dataset.key;
    wx.showToast({
      title: "取消",
      icon: "none",
    });
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
});
```

:::

## 选项状态

选项可以设置为加载状态或禁用状态。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="选项状态"
    data-key="show4"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-action-sheet
  cancel-text="取消"
  data-key="show4"
  show="{ { show4 }}"
  actions="{ { actions4 }}"
  bind:close="onClose"
  bind:cancel="onCancel"
  bind:select="onSelect"
/>
```

```javascript
Page({
  data: {
    show4: false,
    actions4: [
      { name: "着色选项", color: "#ee0a24" },
      { loading: true },
      { name: "禁用选项", disabled: true },
    ],
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onCancel(event) {
    const key = event.currentTarget.dataset.key;
    wx.showToast({
      title: "取消",
      icon: "none",
    });
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
});
```
:::

## 自定义面板

可使用默认插槽自定义面板

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="自定义面板"
    data-key="show5"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-action-sheet
  data-key="show5"
  show="{ { show5 }}"
  title="标题"
  bind:close="onClose"
>
  <view style="height: 400rpx;">内容</view>
</lin-action-sheet>
```

```javascript
Page({
  data: {
    show5: false,
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
});
```

:::

## 微信开放能力

需要传入一个 actions 的数组，数组的每一项是一个对象，对象属性见文档下方表格。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="微信开放能力"
    data-key="show6"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-action-sheet
  title="分享"
  cancel-text="取消"
  data-key="show6"
  show="{ { show6 }}"
  actions="{ { actions6 }}"
  bind:close="onClose"
  bind:cancel="onCancel"
/>
```

```javascript
Page({
  data: {
    show6: false,
    actions6: [
      {
        name: "分享给好友",
        openType: "share",
      },
    ],
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onCancel(event) {
    const key = event.currentTarget.dataset.key;
    wx.showToast({
      title: "取消",
      icon: "none",
    });
    this.setData({
      [key]: false,
    });
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
});
```

:::

## 属性

| 参数               | 说明                 | 类型    | 可选值 | 默认值 |
| ------------------ | -------------------- | ------- | ------ | ------ |
| show               | 是否显示             | Boolean | —      | false  |
| actions            | 菜单选项             | Array   | —      | —      |
| round              | 是否显示圆角         | Boolean | —      | true   |
| closeOnClickAction | 是否在点击选项后关闭 | Boolean | —      | true   |
| closeOnClickMask   | 点击遮罩是否关闭菜单 | Boolean | —      | true   |
| cancelText         | 取消按钮文字         | String  | —      | —      |
| description        | 选项上方的描述信息   | String  | —      | —      |
| title              | 标题                 | String  | —      | —      |
| showCloseIcon      | 是否显示关闭按钮     | Boolean | —      | true   |
| zIndex             | z-index 层级         | Number  | —      | 100    |
| mask               | 是否显示遮罩层       | Boolean | —      | true   |
| safeAreaInsetBottom               | 是否为 iPhoneX 留出底部安全距离       | Boolean | —      | true   |

## 事件

| 事件名              | 说明                                                                                                                   | 参数           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------- |
| bind:select         | 选中选项时触发，禁用或加载状态下不会触发                                                                               | 选项对应的对象 |
| bind:cancel         | 取消按钮点击时触发                                                                                                     | —              |
| bind:close          | 关闭时触发                                                                                                             | —              |
| bind:mask-click     | 点击遮罩层时触发                                                                                                       | —              |
| bind:getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，openType="getUserInfo"时有效 | —              |
| bind:contact        | 客服消息回调，openType="contact"时有效                                                                                 | —              |
| bind:getphonenumber | 获取用户手机号回调，openType="getPhoneNumber"时有效                                                                    | —              |
| bind:error          | 当使用开放能力时，发生错误的回调，openType="launchApp"时有效                                                           | —              |
| bind:launchapp      | 打开 APP 成功的回调，openType="launchApp"时有效                                                                        | —              |
| bind:opensetting    | 在打开授权设置页后回调，openType="openSetting"时有效                                                                   | —              |

## 外部样式类

| 类名              | 说明                     |
| --------------------- | ------------------------ |
| custom-class          | 根节点样式类             |
| title-class           | 标题样式类               |
| description-class     | 选项上方的描述信息样式类 |
| actions-wrapper-class | 容器样式类               |
| button-class          | 按钮样式类               |
| cancelText-class      | 取消按钮样式类           |

## actions 结构

| 参数             | 说明                                                                                                                                                          | 类型    | 可选值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| name             | 标题                                                                                                                                                          | String  | —            |
| subname          | 二级标题                                                                                                                                                      | String  | —            |
| color            | 选项文字颜色                                                                                                                                                  | String  | —            |
| loading          | 是否为加载状态                                                                                                                                                | Boolean | fasle        |
| disabled         | 是否为禁用状态                                                                                                                                                | Boolean | fasle        |
| openType         | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)                                           | String  | —            |
| lang             | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                                                               | String  | en           |
| sessionFrom      | 会话来源，openType="contact"时有效                                                                                                                            | String  | —            |
| sendMessageTitle | 会话内消息卡片标题，openType="contact"时有效                                                                                                                  | String  | 当前标题     |
| sendMessagePath  | 会话内消息卡片点击跳转小程序路径，openType="contact"时有效                                                                                                    | String  | 当前分享路径 |
| sendMessageImg   | 会话内消息卡片图片，openType="contact"时有效                                                                                                                  | String  | 截图         |
| showMessageCard  | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 | Boolean | false        |
| appParameter     | 打开 APP 时，向 APP 传递的参数，openType=launchApp 时有效                                                                                                     | String  | —            |
