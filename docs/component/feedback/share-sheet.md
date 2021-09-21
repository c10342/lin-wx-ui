---
pageClass: component-page-class
---

# ShareSheet 分享面板

---

<demo-image src='/componentImage/feedback/share-sheet.gif' />

## 介绍

底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-share-sheet": "/dist/share-sheet/index"
}
```

## 基础用法

分享面板通过 `options` 属性来定义分享选项，数组的每一项是一个对象，对象格式见文档下方表格。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="基础用法"
    data-key="showShare1"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-share-sheet
  data-key="showShare1"
  show="{ { showShare1 }}"
  title="立即分享给好友"
  options="{ { options1 }}"
  bind:select="onSelect"
  bind:close="onClose"
/>
```

```javascript
Page({
  data: {
    showShare1: false,
    options1: [
      {
        name: "微信",
        icon: "wechat",
        openType: "share",
      },
      {
        name: "微博",
        icon: "weibo",
      },
      {
        name: "复制链接",
        icon: "link",
      },
      {
        name: "分享海报",
        icon: "pic",
      },
      {
        name: "二维码",
        icon: "qrcode",
      },
    ],
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
    this.onClose(event);
  },
});
```

:::

## 展示多行选项

当分享选项的数量较多时，可以将 `options` 定义为数组嵌套的格式，每个子数组会作为一行选项展示。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="展示多行选项"
    data-key="showShare2"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-share-sheet
  data-key="showShare2"
  show="{ { showShare2 }}"
  title="立即分享给好友"
  options="{ { options2 }}"
  bind:select="onSelect"
  bind:close="onClose"
/>
```

```javascript
Page({
  data: {
    showShare2: false,
    options2: [
      [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
      ],
      [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "pic" },
        { name: "二维码", icon: "qrcode" },
      ],
    ],
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
    this.onClose(event);
  },
});
```

:::

## 自定义图片

除了使用内置的几种图标外，可以传入图片地址

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="自定义图片"
    data-key="showShare3"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-share-sheet
  data-key="showShare3"
  show="{ { showShare3 }}"
  title="立即分享给好友"
  options="{ { options3 }}"
  bind:select="onSelect"
  bind:close="onClose"
/>
```

```javascript
Page({
  data: {
    showShare3: false,
    options3: [
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png",
      },
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png",
      },
      {
        name: "名称",
        isImage: true,
        icon: "/images/cat.png",
      },
    ],
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
    this.onClose(event);
  },
});
```

:::

## 展示描述信息

通过 `description` 属性可以设置标题下方的描述文字, 在 options 内设置 `description` 属性可以添加分享选项描述。

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="展示描述信息"
    data-key="showShare4"
    bind:click="onClick"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-share-sheet
  data-key="showShare4"
  show="{ { showShare4 }}"
  title="立即分享给好友"
  description="描述信息"
  options="{ { options4 }}"
  bind:select="onSelect"
  bind:close="onClose"
/>
```

```javascript
Page({
  data: {
    showShare4: false,
    options4: [
      { name: "微信", icon: "wechat" },
      { name: "微博", icon: "weibo" },
      {
        name: "复制链接",
        icon: "link",
        description: "描述信息",
      },
      { name: "分享海报", icon: "pic" },
      { name: "二维码", icon: "qrcode" },
    ],
  },
  onClick(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: true,
    });
  },
  onClose(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: false,
    });
  },
  onSelect(event) {
    wx.showToast({
      title: event.detail.name,
      icon: "none",
    });
    this.onClose(event);
  },
});
```

:::

## 属性

| 参数             | 说明                   | 类型    | 可选值 | 默认值 |
| ---------------- | ---------------------- | ------- | ------ | ------ |
| show             | 是否显示               | Boolean | —      | false  |
| maskStyle        | 遮罩层样式             | String  | —      | —      |
| zIndex           | z-index 层级           | Number  | —      | 100    |
| title            | 顶部标题               | String  | —      | —      |
| cancelText       | 取消按钮文字           | String  | —      | 取消   |
| description      | 标题下方的辅助描述文字 | String  | —      | —      |
| options          | 分享选项               | Array   | —      | —      |
| mask             | 是否显示遮罩层         | Boolean | —      | true   |
| closeOnClickMask | 是否在点击遮罩层后关闭 | Boolean | —      | true   |
| duration         | 动画时长，单位毫秒     | Number  | —      | 300    |
| safeAreaInsetBottom | 是否为 iPhoneX 留出底部安全距离 | Boolean | —      | true   |

## Option 数据结构

`options`属性为一个对象数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名        | 说明                                                   | 类型   |
| ----------- | ------------------------------------------------------ | ------ |
| name        | 分享渠道名称                                           | String |
| description | 分享选项描述                                           | String |
| icon        | 图标名称，当`isImage`字段为`true`时传入图片地址        | String |
| openType    | 按钮 `open-type`，可用于实现分享功能，可选值为 `share` | String |

## 事件

| 事件名      | 说明               | 参数                          |
| ----------- | ------------------ | ----------------------------- |
| bind:select | 点击分享选项时触发 | option: Option, index: number |
| bind:close  | 关闭时触发         | —                             |
| bind:cancel | 点击取消按钮时触发 | —                             |

## 插槽

| 插槽名称    | 说明           |
| ----------- | -------------- |
| title       | 自定义顶部标题 |
| description | 自定义描述文字 |

## 外部样式类

| 类名               | 说明               |
| ---------------------- | ------------------ |
| custom-class           | 根节点样式类       |
| header-class           | 头部样式类         |
| title-class            | 标题样式类         |
| description-class      | 描述文字样式类     |
| cancel-class           | 取消按钮样式类     |
| item-custom-class      | 选项根节点样式类   |
| item-options-class     | 选项容器样式类     |
| item-option-class      | 选项样式类         |
| item-button-class      | 选项按钮样式类     |
| item-image-class       | 选项图片样式类     |
| item-icon-class        | 选项图标样式类     |
| item-name-class        | 选项名称样式类     |
| item-description-class | 选项描述文字样式类 |
