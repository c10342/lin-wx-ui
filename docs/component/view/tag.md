---
pageClass: component-page-class
---

# Tag 标签

---

<demo-image src='/componentImage/view/tag.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-tag": "/dist/tag/index"
}
```

## 基础用法

通过 `type` 属性控制标签颜色

::: details 代码示例

```html
<lin-tag class="lin-tag-item" type="primary">标签</lin-tag>
<lin-tag class="lin-tag-item" type="success">标签</lin-tag>
<lin-tag class="lin-tag-item" type="danger">标签</lin-tag>
<lin-tag class="lin-tag-item" type="warning">标签</lin-tag>
<lin-tag class="lin-tag-item" type="info">标签</lin-tag>
```

:::

## 空心样式

设置 `plain` 属性设置为空心样式。

::: details 代码示例

```html
<lin-tag class="lin-tag-item" plain type="primary">标签</lin-tag>
<lin-tag class="lin-tag-item" plain type="success">标签</lin-tag>
<lin-tag class="lin-tag-item" plain type="danger">标签</lin-tag>
<lin-tag class="lin-tag-item" plain type="warning">标签</lin-tag>
<lin-tag class="lin-tag-item" plain type="info">标签</lin-tag>
```

:::

## 圆角样式

通过 `round` 设置为圆角样式。

::: details 代码示例

```html
<lin-tag class="lin-tag-item" round type="primary">标签</lin-tag>
<lin-tag class="lin-tag-item" round type="success">标签</lin-tag>
<lin-tag class="lin-tag-item" round type="danger">标签</lin-tag>
<lin-tag class="lin-tag-item" round type="warning">标签</lin-tag>
<lin-tag class="lin-tag-item" round type="info">标签</lin-tag>
```

:::

## 标记样式

通过 `mark` 设置为标记样式(半圆角)。

::: details 代码示例

```html
<lin-tag class="lin-tag-item" mark type="primary">标签</lin-tag>
<lin-tag class="lin-tag-item" mark type="success">标签</lin-tag>
<lin-tag class="lin-tag-item" mark type="danger">标签</lin-tag>
<lin-tag class="lin-tag-item" mark type="warning">标签</lin-tag>
<lin-tag class="lin-tag-item" mark type="info">标签</lin-tag>
```

:::

## 自定义颜色

通过 `color` 自定义背景颜色，`text-color`自定义文字颜色

::: details 代码示例

```html
<lin-tag class="lin-tag-item" color="#f2826a">标签</lin-tag>
<lin-tag class="lin-tag-item" color="#7232dd">标签</lin-tag>
<lin-tag class="lin-tag-item" color="#7232dd" plain>标签</lin-tag>
<lin-tag class="lin-tag-item" color="#ffe1e1" text-color="#ad0000"
  >标签</lin-tag
>
```

:::

## 标签大小

通过 `size` 设置标签大小

::: details 代码示例

```html
<lin-tag class="lin-tag-item" type="danger">标签</lin-tag>
<lin-tag class="lin-tag-item" type="danger" size="medium">标签</lin-tag>
<lin-tag class="lin-tag-item" type="danger" size="large">标签</lin-tag>
```

:::

## 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `close` 事件，在 `close` 事件中可以执行隐藏标签的逻辑。

::: details 代码示例

```html
<lin-tag
  class="lin-tag-item"
  wx:if="{ { show.primary }}"
  closeable
  size="medium"
  type="primary"
  id="primary"
  bind:close="onClose"
>
  标签
</lin-tag>
<lin-tag
  class="lin-tag-item"
  wx:if="{ { show.success }}"
  closeable
  size="medium"
  type="success"
  id="success"
  bind:close="onClose"
>
  标签
</lin-tag>
```

```javascript
Page({
  data: {
    show: {
      primary: true,
      success: true,
    },
  },
  onClose(event) {
    this.setData({
      [`show.${event.target.id}`]: false,
    });
  },
});
```

:::

## 属性

| 参数      | 说明             | 类型    | 可选值                                            | 默认值  |
| --------- | ---------------- | ------- | ------------------------------------------------- | ------- |
| type      | 类型             | String  | `primary`, `success`, `danger`, `warning`, `info` | primary |
| size      | 大小             | String  | `large`, `medium`                                 | —       |
| color     | 标签颜色         | String  | —                                                 | —       |
| plain     | 是否为空心样式   | Boolean | —                                                 | false   |
| round     | 是否为圆角样式   | Boolean | —                                                 | false   |
| mark      | 是否为标记样式   | Boolean | —                                                 | false   |
| textColor | 文本颜色         | String  | —                                                 | —       |
| closeable | 是否为可关闭标签 | Boolean | —                                                 | false   |

## 事件

| 事件名     | 说明           | 参数 |
| ---------- | -------------- | ---- |
| bind:close | 关闭标签时触发 | —    |

## 外部样式类

| 类名     | 说明           |
| ------------ | -------------- |
| custom-class | 根节点样式类   |
| icon-class   | 关闭图标样式类 |
