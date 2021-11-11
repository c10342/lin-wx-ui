---
pageClass: component-page-class
---

# Calendar 日历

---

<demo-image src='/componentImage/form/calendar.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
  "lin-calendar": "/dist/calendar/index"
}
```

## 基础使用

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发`confirm`事件

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    value="{ {utils.formatDate(date1).str}}"
    data-show="show1"
    bind:click="setShowData"
    title="基础用法"
    is-link
  />
</lin-cell-group>
<lin-calendar
  value="{ {date1}}"
  bind:confirm="onConfirm"
  bind:close="onMaskClick"
  bind:mask-click="onMaskClick"
  show="{ {show1}}"
  data-show="show1"
  data-key="date1"
/>
```

```javascript
Page({
  data: {
    show1: false,
    date1: "2020-10-25",
  },
  setShowData(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },

  onConfirm(event) {
    const key = event.currentTarget.dataset.key;
    const show = event.currentTarget.dataset.show;
    this.setData({
      [key]: event.detail,
      [show]: false,
    });
  },
});
```

:::

## 禁用日期

可禁用不同时间段日期

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    value="{ {utils.formatDate(date2).str}}"
    data-show="show2"
    bind:click="setShowData"
    title="小于等于指定日期"
    is-link
  />

  <lin-cell
    value="{ {utils.formatDate(date3).str}}"
    data-show="show3"
    bind:click="setShowData"
    title="大于等于指定日期"
    is-link
  />

  <lin-cell
    value="{ {utils.formatDate(date4).str}}"
    data-show="show4"
    bind:click="setShowData"
    title="指定范围日期"
    is-link
  />

  <lin-cell
    value="{ {utils.formatDate(date5).str}}"
    data-show="show5"
    bind:click="setShowData"
    title="指定多个日期"
    is-link
  />
</lin-cell-group>
<lin-calendar
  disabledBeforeDate="{ {disabledBeforeDate}}"
  value="{ {date2}}"
  bind:confirm="onConfirm"
  bind:close="onMaskClick"
  bind:mask-click="onMaskClick"
  show="{ {show2}}"
  data-show="show2"
  data-key="date2"
/>

<lin-calendar
  disabledAfterDate="{ {disabledAfterDate}}"
  value="{ {date3}}"
  bind:confirm="onConfirm"
  bind:close="onMaskClick"
  bind:mask-click="onMaskClick"
  show="{ {show3}}"
  data-show="show3"
  data-key="date3"
/>

<lin-calendar
  disabledRangeDate="{ {disabledRangeDate}}"
  value="{ {date4}}"
  bind:confirm="onConfirm"
  bind:close="onMaskClick"
  bind:mask-click="onMaskClick"
  show="{ {show4}}"
  data-show="show4"
  data-key="date4"
/>

<lin-calendar
  disabledDate="{ {disabledDate}}"
  value="{ {date5}}"
  bind:confirm="onConfirm"
  bind:close="onMaskClick"
  bind:mask-click="onMaskClick"
  show="{ {show5}}"
  data-show="show5"
  data-key="date5"
/>
```

```javascript
Page({
  data: {
    show2: false,
    date2: "2020-10-25",
    disabledBeforeDate: "2020-10-22",
    show3: false,
    date3: "2020-10-25",
    disabledAfterDate: "2020-10-27",
    show4: false,
    date4: "2020-10-25",
    disabledRangeDate: ["2020-10-10", "2020-10-15"],
    show5: false,
    date5: "2020-10-25",
    disabledDate: ["2020-10-22", "2020-10-16"],
  },
  setShowData(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: true });
  },

  onMaskClick(event) {
    const key = event.currentTarget.dataset.show;
    this.setData({ [key]: false });
  },

  onConfirm(event) {
    const key = event.currentTarget.dataset.key;
    const show = event.currentTarget.dataset.show;
    this.setData({
      [key]: event.detail,
      [show]: false,
    });
  },
});
```

:::

## 平铺展示

将`poppable`设置为`false`，日历会直接展示在页面内，而不是以弹层的形式出现

::: details 代码示例

```html
<lin-calendar poppable="{ {false}}" showConfirm="{ {false}}" />
```

:::

## 属性

| 参数               | 说明                     | 类型           | 可选值 | 默认值   |
| ------------------ | ------------------------ | -------------- | ------ | -------- |
| show               | 是否显示                 | Boolean        | —      | false    |
| value              | 绑定值                   | String, Number | —      | —        |
| title              | 日历标题                 | String         | —      | 日期选择 |
| showTitle          | 是否展示日历标题         | Boolean        | —      | true     |
| showConfirm        | 是否展示确认按钮         | Boolean        | —      | true     |
| confirmText        | 确认按钮的文字           | String         | —      | 确定     |
| disabledConfirm    | 禁用确定按钮             | Boolean        | —      | false    |
| rowHeight          | 日期行高                 | String, Number | —      | —        |
| restText           | 重置按钮文案             | String         | —      | 重置     |
| showReset          | 是否展示重置按钮         | Boolean        | —      | false    |
| disabledReset      | 禁用重置按钮             | Boolean        | —      | false    |
| disabledBeforeDate | 禁用该日期前的日期       | String, Number | —      | —        |
| disabledAfterDate  | 禁用该日期后的日期       | String, Number | —      | —        |
| disabledRangeDate  | 禁用范围内的日期         | Array          | —      | —        |
| disabledDate       | 禁用指定日期             | Array          | —      | —        |
| disabled           | 禁用所有日期             | Boolean        | —      | false    |
| poppable           | 是否以弹层的形式展示日历 | Boolean        | —      | true     |
| safeAreaInsetBottom               | 是否为 iPhoneX 留出底部安全距离       | Boolean | —      | true   |

## 事件

| 事件名          | 说明                 | 参数         |
| --------------- | -------------------- | ------------ |
| bind:mask-click | 点击遮罩层时触发     | —            |
| bind:change     | 选中值发生变化时触发 | 当前时间戳   |
| bind:prevMonth  | 点击上一个月时触发   | 当前时间对象 |
| bind:nextMonth  | 点击下一个月时触发   | 当前时间对象 |
| bind:prevYear   | 点击上一年时触发     | 当前时间对象 |
| bind:nextYear   | 点击下一年时触发     | 当前时间对象 |
| bind:confirm    | 点击确认按钮时触发   | 当前时间戳   |
| bind:reset      | 点击重置按钮时触发   | —            |
| bind:close      | 关闭的时候触发       | —            |
