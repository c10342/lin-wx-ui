---
pageClass: component-page-class
---

# Mask 遮罩层

---

<demo-image src='/componentImage/feedback/mask.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-mask": "/dist/Mask/index"
}
```

## 基础用法

通过`show`属性控制遮罩层的显示和隐藏

::: details 代码示例

```html
<lin-button data-show="show1" type="success" bind:click="onClick">
  显示遮罩层
</lin-button>

<lin-mask data-show="show1" show="{ {show1}}" bind:click="onMaskClick" />
```

```javascript
Page({
  data: {
    show1: false,
  },
  onClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },
});
```

:::

## 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容

::: details 代码示例

```html
<lin-button data-show="show2" type="success" bind:click="onClick">
  嵌入内容
</lin-button>

<lin-mask
  class="mask-demo"
  data-show="show2"
  show="{ {show2}}"
  bind:click="onMaskClick"
>
  <view class="custom"></view>
</lin-mask>
```

```javascript
Page({
  data: {
    show2: false,
  },
  onClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },
});
```

```css
.custom {
  width: 200rpx;
  height: 200rpx;
  background-color: #fff;
}

.mask-demo .lin-transition {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
```

:::

## 属性

| 参数        | 说明             | 类型          | 可选值 | 默认值 |
| ----------- | ---------------- | ------------- | ------ | ------ |
| show        | 是否展示遮罩层   | Boolean       | —      | false  |
| duration    | 动画时长，单位秒 | String,Number | —      | 200    |
| zIndex      | z-index 层级     | Number        | —      | 100    |
| customStyle | 自定义样式       | String        | —      | —      |
| opacity     | 透明度           | Number        | —      | 0.5    |

## 事件

| 事件名     | 说明             | 参数 |
| ---------- | ---------------- | ---- |
| bind:click | 点击遮罩层时触发 | —    |

## 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
