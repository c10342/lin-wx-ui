---
pageClass: component-page-class
---

# Tab 标签页

---

<demo-image src='/componentImage/navigation/tab.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
   "lin-tab": "/dist/Tab/index",
   "lin-tabs": "/dist/Tabs/index"
}
```

## 基础用法

通过`active`设定当前激活标签对应的索引值，默认情况下启用第一个标签

::: details 代码示例

```html
<lin-tabs data-key="active1" active="{ { active1 }}" bind:change="onChange">
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
  <lin-tab title="标签 4">内容 4</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active1: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 通过名称匹配

标签指定`name`属性的情况下，`active`的值为当前标签的`name`（此时无法通过索引值来匹配标签）

::: details 代码示例

```html
<lin-tabs data-key="active2" active="{ { active2 }}" bind:change="onChange">
  <lin-tab title="标签 1" name="a">内容 1</lin-tab>
  <lin-tab title="标签 2" name="b">内容 2</lin-tab>
  <lin-tab title="标签 3" name="c">内容 3</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active2: "a",
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 横向滚动

多于 5 个标签时，Tab 可以横向滚动

::: details 代码示例

```html
<lin-tabs data-key="active3" active="{ { active3 }}" bind:change="onChange">
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
  <lin-tab title="标签 4">内容 4</lin-tab>
  <lin-tab title="标签 5">内容 5</lin-tab>
  <lin-tab title="标签 6">内容 6</lin-tab>
  <lin-tab title="标签 7">内容 7</lin-tab>
  <lin-tab title="标签 8">内容 8</lin-tab>
  <lin-tab title="标签 9">内容 9</lin-tab>
  <lin-tab title="标签 10">内容 10</lin-tab>
  <lin-tab title="标签 11">内容 11</lin-tab>
  <lin-tab title="标签 12">内容 12</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active3: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`lin-tabs`上监听`disabled`事件

::: details 代码示例

```html
<lin-tabs
  data-key="active4"
  active="{ { active4 }}"
  bind:change="onChange"
  bind:disabled="onClickDisabled"
>
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2" disabled>内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active4: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.name + 1} 已被禁用`,
      icon: "none",
    });
  },
});
```

:::

## 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格

::: details 代码示例

```html
<lin-tabs
  data-key="active5"
  active="{ { active5 }}"
  bind:change="onChange"
  type="card"
>
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active5: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 `Tab` 滚动到顶部时会自动吸顶

::: details 代码示例

```html
<lin-tabs
  data-key="active6"
  active="{ { active6 }}"
  bind:change="onChange"
  sticky
>
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active6: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 切换动画

可以通过`animated`来设置是否启用切换 tab 时的动画。

::: details 代码示例

```html
<lin-tabs
  data-key="active7"
  active="{ { active7 }}"
  bind:change="onChange"
  animated
>
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
  <lin-tab title="标签 4">内容 4</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active7: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 滑动切换

通过`swipeable`属性可以开启滑动切换标签页

::: details 代码示例

```html
<lin-tabs
  data-key="active8"
  active="{ { active8 }}"
  bind:change="onChange"
  swipeable
>
  <lin-tab title="标签 1">内容 1</lin-tab>
  <lin-tab title="标签 2">内容 2</lin-tab>
  <lin-tab title="标签 3">内容 3</lin-tab>
  <lin-tab title="标签 4">内容 4</lin-tab>
</lin-tabs>
```

```javascript
Page({
  data: {
    active8: 0,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
});
```

:::

## 嵌套 popup

如果将 `lin-tabs` 嵌套在 `lin-popup` 等会隐藏内容的组件或节点内，当 `lin-tabs` 显示时下划线将不会正常显示。

此时可以通过使用 `wx:if` 手动控制 `lin-tabs` 的渲染来规避这种场景。

::: details 代码示例

```html
<lin-button style="margin-left:20rpx;" bind:click="onClick">显示</lin-button>

<lin-popup show="{ { show }}" position="bottom" bind:mask-click="onMaskClick">
  <lin-tabs
    wx:if="{ {show}}"
    data-key="active9"
    active="{ { active9 }}"
    bind:change="onChange"
  >
    <lin-tab title="标签 1">内容 1</lin-tab>
    <lin-tab title="标签 2">内容 2</lin-tab>
    <lin-tab title="标签 3">内容 3</lin-tab>
    <lin-tab title="标签 4">内容 4</lin-tab>
  </lin-tabs>
</lin-popup>
```

```javascript
Page({
  data: {
    active9: 0,
    show: false,
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail.name,
    });
  },
  onClick() {
    this.setData({ show: true });
  },

  onMaskClick() {
    this.setData({ show: false });
  },
});
```

:::

## Tabs 属性

| 参数               | 说明                                                           | 类型           | 可选值         | 默认值 |
| ------------------ | -------------------------------------------------------------- | -------------- | -------------- | ------ |
| type               | 样式风格                                                       | String         | `line`, `card` | line   |
| color              | 标签主题色                                                     | String         | —              | —      |
| active             | 当前选中标签的标识符                                           | String, Number | —              | 0      |
| duration           | 动画时间，单位秒                                               | Number         | —              | —      |
| lineWidth          | 底部条宽度，默认单位 px                                        | String, Number | —              | —      |
| lineHeight         | 底部条高度，默认单位 px                                        | String, Number | —              | —      |
| animated           | 是否开启切换标签内容时的转场动画                               | Boolean        | —              | false  |
| border             | 是否展示外边框，仅在 `line` 风格下生效                         | Boolean        | —              | false  |
| ellipsis           | 是否省略过长的标题文字                                         | Boolean        | —              | true   |
| sticky             | 是否使用粘性定位布局                                           | Boolean        | —              | false  |
| swipeable          | 是否开启手势滑动切换                                           | Boolean        | —              | false  |
| lazyRender         | 是否开启标签页内容延迟渲染                                     | Boolean        | —              | false  |
| offsetTop          | 粘性定位布局下与顶部的最小距离，单位 px                        | Number         | —              | —      |
| swipeThreshold     | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | Number         | —              | 5      |
| titleActiveColor   | 标题选中态颜色                                                 | String         | —              | —      |
| titleInactiveColor | 标题默认态颜色                                                 | String         | —              | —      |
| zIndex             | z-index 层级                                                   | Number         | —              | —      |

## Tabs 事件

| 事件名        | 说明                     | 参数             |
| ------------- | ------------------------ | ---------------- |
| bind:change   | 当前激活的标签改变时触发 | name：标签标识符 |
| bind:disabled | 点击被禁用的标签时触发   | name：标签标识符 |
| bind:click    | 点击标签时触发           | name：标签标识符 |

## Tabs 插槽

| 插槽名称  | 说明           |
| --------- | -------------- |
| —         | 自定义显示内容 |
| nav-left  | 标题左侧内容   |
| nav-right | 标题右侧内容   |

## Tabs 外部样式类

| 类名       | 说明           |
| -------------- | -------------- |
| custom-class   | 根节点样式类   |
| wrapper-class  | 选项容器样式类 |
| scroll-class   | 滚动容器样式类 |
| list-class     | 标题列表样式类 |
| line-class     | 横线样式类     |
| tab-item-class | 选项样式类     |
| title-class    | 标题样式类     |
| content-class  | 内容容器样式类 |
| track-class    | 内容样式类     |

## Tab 属性

| 参数       | 说明                       | 类型           | 可选值 | 默认值       |
| ---------- | -------------------------- | -------------- | ------ | ------------ |
| name       | 标签名称，作为匹配的标识符 | String, Number | —      | 标签的索引值 |
| title      | 标题                       | String         | —      | —            |
| disabled   | 是否禁用标签               | Boolean        | —      | false        |
| dot        | 是否显示小红点             | Boolean        | —      | false        |
| info       | 图标右上角提示信息         | String, Number | —      | —            |
| titleStyle | 自定义标题样式             | String         | —      | —            |

## Tab 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
