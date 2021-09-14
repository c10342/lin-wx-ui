---
pageClass: component-page-class
---

# CountDown 倒计时

---

<demo-image src='/componentImage/view/count-down.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-count-down": "/dist/count-down/index"
}
```

## 基础用法

`time`属性表示倒计时总时长，单位为毫秒

::: details 代码示例

```html
<lin-count-down time="{ { time1 }}" />
```

```javascript
Page({
  data: {
    time1: 30 * 60 * 60 * 1000,
  },
});
```

:::

## 自定义格式

通过`format`属性设置倒计时文本的内容

::: details 代码示例

```html
<lin-count-down time="{ { time1 }}" format="DD 天 HH 时 mm 分 ss 秒" />
```

```javascript
Page({
  data: {
    time1: 30 * 60 * 60 * 1000,
  },
});
```

:::

## 毫秒级渲染

倒计时默认每秒渲染一次，设置`millisecond`属性可以开启毫秒级渲染

::: details 代码示例

```html
<lin-count-down time="{ { time1 }}" format="DD 天 HH 时 mm 分 ss 秒" />
```

```javascript
Page({
  data: {
    time1: 30 * 60 * 60 * 1000,
  },
});
```

:::

## 自定义样式

设置`use-slot`属性后可以自定义倒计时样式，需要通过`bind:change`事件获取`timeData`对象并自行渲染，格式见下方表格

::: details 代码示例

```html
<lin-count-down use-slot time="{ { time2 }}" bind:change="onChange">
  <text class="item">{ { timeData.hours }}</text>
  <text class="item">{ { timeData.minutes }}</text>
  <text class="item">{ { timeData.seconds }}</text>
</lin-count-down>
```

```javascript
Page({
  data: {
    time2: 30 * 60 * 60 * 1000,
    timeData: {},
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
});
```

```css
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
```

:::

## 手动控制

通过 `selectComponent` 选择器获取到组件实例后，可以调用`start`、`pause`、`reset`方法

::: details 代码示例

```html
<lin-count-down
  class="control-count-down"
  millisecond
  time="{ { 3000 }}"
  auto-start="{ { false }}"
  format="ss:SSS"
  bind:finish="finished"
/>
<view class="button-group">
  <lin-button class="button-item" bind:click="start">开始</lin-button>
  <lin-button class="button-item" bind:click="pause">暂停</lin-button>
  <lin-button class="button-item" bind:click="reset">重置</lin-button>
</view>
```

```javascript
Page({
  start() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.start();
  },

  pause() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.pause();
  },

  reset() {
    const countDown = this.selectComponent(".control-count-down");
    countDown.reset();
  },

  finished() {
    wx.showToast({
      title: "倒计时结束",
      icon: "none",
    });
  },
});
```

:::

## 属性

| 参数        | 说明                                           | 类型    | 可选值 | 默认值 |
| ----------- | ---------------------------------------------- | ------- | ------ | ------ |
| time        | 倒计时时长，单位毫秒                           | Number  | —      | —      |
| format      | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | String  | —      | —      |
| autoStart   | 是否自动开始倒计时                             | Boolean | —      | true   |
| millisecond | 是否开启毫秒级渲染                             | Boolean | —      | false  |
| useSlot     | 是否使用自定义样式插槽                         | Boolean | —      | false  |

## 事件

| 事件名      | 说明             | 参数     |
| ----------- | ---------------- | -------- |
| bind:change | 时间变化时触发   | timeData |
| bind:finish | 倒计时结束时触发 | —        |

## 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

## timeData 格式

| 名称         | 说明     | 类型   |
| ------------ | -------- | ------ |
| days         | 剩余天数 | Number |
| hours        | 剩余小时 | Number |
| minutes      | 剩余分钟 | Number |
| seconds      | 剩余秒数 | Number |
| milliseconds | 剩余毫秒 | Number |

## 方法

通过 selectComponent 可以获取到 CountDown 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍                                                       |
| ------ | ---- | ------ | ---------------------------------------------------------- |
| start  | —    | void   | 开始倒计时                                                 |
| pause  | —    | void   | 暂停倒计时                                                 |
| reset  | —    | void   | 重设倒计时，若`auto-start`为`true`，重设后会自动开始倒计时 |
