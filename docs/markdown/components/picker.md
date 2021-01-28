# Picker 选择器

---

 <div class="demo-outer-container">
     <div class="demo-inner-container">
        <div class="demo-content">
            <img class="demo-image" src='../../componentImage/picker.gif' />
        </div>
     </div>
 </div>

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/#/start)

```json
"usingComponents": {
  "lin-picker": "/dist/Picker/index"
}
```

## 基础用法

:::demo

```html
<lin-picker columns="{ { columns1 }}" bind:change="onChange" />
```

```javascript
Page({
  data: {
    columns1: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  },
  onChange(data) {
    wx.showToast({
      title: `${data.detail.index} - ${data.detail.value}`,
      icon: "none",
    });
  },
});
```

:::

## 默认选中项

单列选择器可以直接通过`default-index`属性设置初始选中项的索引值

:::demo

```html
<lin-picker
  default-index="{ { 2 }}"
  columns="{ { columns1 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    columns1: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  },
  onChange(data) {
    wx.showToast({
      title: `${data.detail.index} - ${data.detail.value}`,
      icon: "none",
    });
  },
});
```

:::

## 展示顶部栏

单列选择器可以直接通过`default-index`属性设置初始选中项的索引值

:::demo

```html
<lin-picker
  bind:cancel="onCancel"
  bind:confirm="onConfirm"
  show-toolbar
  title="标题"
  columns="{ { columns1 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    columns1: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  },
  onChange(data) {
    wx.showToast({
      title: `${data.detail.index} - ${data.detail.value}`,
      icon: "none",
    });
  },
  onCancel(event) {
    wx.showToast({
      title: "取消",
      icon: "none",
    });
  },
  onConfirm(event) {
    wx.showToast({
      title: event.detail.value,
      icon: "none",
    });
  },
});
```

:::

## 多列联动

:::demo

```html
<lin-picker columns="{ { columns2 }}" bind:change="onChange1" />
```

```javascript
const citys = {
  浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  福建: ["福州", "厦门", "莆田", "三明", "泉州"],
};

Page({
  data: {
    columns2: [
      {
        values: Object.keys(citys),
        className: "column1",
      },
      {
        values: citys["浙江"],
        className: "column2",
        defaultIndex: 2,
      },
    ],
  },
  onChange1(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
});
```

:::

## 禁用选项

选项可以为对象结构，通过设置 disabled 来禁用该选项

:::demo

```html
<lin-picker columns="{ { columns3 }}" />
```

```javascript
Page({
  data: {
    columns3: [
      { text: "杭州", disabled: true },
      { text: "宁波" },
      { text: "温州" },
    ],
  },
});
```

:::

## 加载状态

当 Picker 数据是通过异步获取时，可以通过 `loading` 属性显示加载提示

:::demo

```html
<lin-picker columns="{ { columns1 }}" loading />
```

```javascript
Page({
  data: {
    columns1: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
  },
});
```

:::

## 属性

| 参数              | 说明                                                             | 类型    | 可选值 | 默认值 |
| ----------------- | ---------------------------------------------------------------- | ------- | ------ | ------ |
| columns           | 对象数组，配置每一列显示的数据                                   | Array   | —      | []     |
| itemHeight        | 选项高度                                                         | Number  | —      | 44     |
| valueKey          | 选项对象中，文字对应的 key                                       | String  | —      | text   |
| showToolbar       | 是否显示顶部栏                                                   | Boolean | —      | false  |
| title             | 顶部栏标题                                                       | String  | —      | —      |
| confirmButtonText | 确认按钮文字                                                     | String  | —      | 确认   |
| cancelButtonText  | 取消按钮文字                                                     | String  | —      | 取消   |
| toolbarPosition   | 顶部栏位置                                                       | String  | —      | top    |
| visibleItemCount  | 可见的选项个数                                                   | Number  | —      | 6      |
| defaultIndex      | 单列选择器的默认选中项索引， 多列选择器请参考下方的 Columns 配置 | Number  | —      | 0      |
| loading           | 是否显示加载状态                                                 | Boolean | —      | false  |

## 事件

| 事件名       | 说明               | 参数                                                                                              |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------- |
| bind:change  | 选项改变时触发     | 单列：Picker 实例，选中值，选中值对应的索引<br/>多列：Picker 实例，所有列选中值，当前列对应的索引 |
| bind:cancel  | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引<br/>多列：所有列选中值，所有列选中值对应的索引                     |
| bind:confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引<br/>多列：所有列选中值，所有列选中值对应的索引                     |

## Columns 数据结构

当传入多列数据时，`columns` 为一个对象数组，数组中的每一个对象配置每一列，每一列有以下 `key`

| key          | 说明                       |
| ------------ | -------------------------- |
| values       | 列中对应的备选值           |
| defaultIndex | 初始选中项的索引，默认为 0 |

## 外部样式类

| 类名      | 说明         |
| ------------- | ------------ |
| custom-class  | 根节点样式类 |
| active-class  | 选中项样式类 |
| toolbar-class | 顶部栏样式类 |
| column-class  | 列样式类     |

## 方法

通过 selectComponent 可以获取到 picker 实例并调用实例方法

| 方法名          | 参数                     | 返回值      | 介绍                       |
| --------------- | ------------------------ | ----------- | -------------------------- |
| getValues       | —                        | values      | 获取所有列选中的值         |
| setValues       | values                   | —           | 设置所有列选中的值         |
| getIndexes      | —                        | indexes     | 获取所有列选中值对应的索引 |
| setIndexes      | indexes                  | —           | 设置所有列选中值对应的索引 |
| getColumnValue  | columnIndex              | value       | 获取对应列选中的值         |
| setColumnValue  | columnIndex, value       | —           | 设置对应列选中的值         |
| getColumnIndex  | columnIndex              | optionIndex | 获取对应列选中项的索引     |
| setColumnIndex  | columnIndex, optionIndex | —           | 设置对应列选中项的索引     |
| getColumnValues | columnIndex              | values      | 获取对应列中所有选项       |
| setColumnValues | columnIndex, values      | —           | 设置对应列中所有选项       |
