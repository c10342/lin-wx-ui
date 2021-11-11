---
pageClass: component-page-class
---

# Radio 单选框

---

<demo-image src='/componentImage/form/radio.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
  "lin-radio": "/dist/radio/index",
  "lin-radio-group": "/dist/radio-group/index",
}
```

## 基础用法

通过`value`绑定值当前选中项的 name

::: details 代码示例

```html
<lin-radio-group data-key="radio1" value="{ { radio1 }}" bind:change="onChange">
  <lin-radio name="1">单选框 1</lin-radio>
  <lin-radio name="2">单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio1: "1",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 禁用状态

通过`disabled`属性禁止选项切换，在`Radio`上设置`diabled`可以禁用单个选项

::: details 代码示例

```html
<lin-radio-group
  data-key="radio2"
  disabled
  value="{ { radio2 }}"
  bind:change="onChange"
>
  <lin-radio name="1">单选框 1</lin-radio>
  <lin-radio name="2">单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio2: "1",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 自定义形状

将`shape`属性设置为`square`，单选框的形状会变成方形

::: details 代码示例

```html
<lin-radio-group data-key="radio3" value="{ { radio3 }}" bind:change="onChange">
  <lin-radio shape="square" name="1">单选框 1</lin-radio>
  <lin-radio shape="square" name="2">单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio3: "",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 自定义颜色

通过`checked-color`属性设置选中状态的图标颜色

::: details 代码示例

```html
<lin-radio-group data-key="radio4" value="{ { radio4 }}" bind:change="onChange">
  <lin-radio checked-color="#07c160" name="1">单选框 1</lin-radio>
  <lin-radio checked-color="#07c160" name="2">单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio4: "2",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 自定义大小

通过`icon-size`属性可以自定义图标的大小

::: details 代码示例

```html
<lin-radio-group data-key="radio5" value="{ { radio5 }}" bind:change="onChange">
  <lin-radio name="1" icon-size="24px">单选框 1</lin-radio>
  <lin-radio name="2" icon-size="24px">单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio5: "2",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 自定义图标

通过`icon`插槽自定义图标，需要设置`use-icon-slot`属性

::: details 代码示例

```html
<lin-radio-group data-key="radio6" value="{ { radio6 }}" bind:change="onChange">
  <lin-radio name="1" use-icon-slot>
    单选框 1
    <lin-icon icon="search" slot="icon" color="{ {radio6==1?'red':''}}" />
  </lin-radio>
  <lin-radio name="2" use-icon-slot>
    单选框 2
    <lin-icon icon="search" slot="icon" color="{ {radio6==2?'red':''}}" />
  </lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio6: "2",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 禁用文本点击

通过设置`label-disabled`属性可以禁用单选框文本点击

::: details 代码示例

```html
<lin-radio-group data-key="radio7" value="{ { radio7 }}" bind:change="onChange">
  <lin-radio name="1" label-disabled>单选框 1</lin-radio>
  <lin-radio name="2" label-disabled>单选框 2</lin-radio>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio7: "2",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

::: details 代码示例

```html
<lin-radio-group data-key="radio8" value="{ { radio8 }}" bind:change="onChange">
  <lin-cell-group>
    <lin-cell title="单选框 1" data-name="1" bind:click="onClick">
      <lin-radio slot="right-icon" name="1" />
    </lin-cell>
    <lin-cell title="单选框 2" data-name="2" bind:click="onClick">
      <lin-radio slot="right-icon" name="2" />
    </lin-cell>
  </lin-cell-group>
</lin-radio-group>
```

```javascript
Page({
  data: {
    radio8: "2",
  },
  onChange(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail,
    });
  },
  onClick(event) {
    const name = event.currentTarget.dataset.name;
    this.setData({
      radio8: name,
    });
  },
});
```

:::

## Radio 属性

| 参数          | 说明                     | 类型           | 可选值            | 默认值 |
| ------------- | ------------------------ | -------------- | ----------------- | ------ |
| useIconSlot   | 是否使用 icon 插槽       | Boolean        | —                 | false  |
| iconSize      | 图标大小，默认单位为`px` | String,Number  | —                 | 40rpx  |
| shape         | 形状                     | String         | `round`, `square` | round  |
| checkedColor  | 选中状态颜色             | String         | —                 | —      |
| value         | 当前选中项的标识符       | String, Number | —                 | —      |
| disabled      | 是否为禁用状态           | Boolean        | —                 | false  |
| name          | 标识符                   | any            | —                 | —      |
| labelDisabled | 是否禁用文本内容点击     | Boolean        | —                 | false  |

## Radio 事件

| 事件名      | 说明                     | 参数              |
| ----------- | ------------------------ | ----------------- |
| bind:change | 当绑定值变化时触发的事件 | 当前选中项的 name |

## Radio 插槽

| 插槽名称 | 说明       |
| -------- | ---------- |
| —        | 自定义文本 |
| icon     | 自定义图标 |

## RadioGroup 外部样式类

| 类名     | 说明           |
| ------------ | -------------- |
| custom-class | 根节点样式类   |
| icon-class   | 图标样式类     |
| label-class  | 描述信息样式类 |

## RadioGroup 属性

| 参数      | 说明                   | 类型    | 可选值          | 默认值 |
| --------- | ---------------------- | ------- | --------------- | ------ |
| value     | 当前选中项的标识符     | any     | —               | —      |
| disabled  | 是否禁用所有单选框     | Boolean | —               | false  |
| name      | 在表单内提交时的标识符 | String  | —               | —      |
| direction | 选项排版方向           | String  | `column`, `row` | column |

## RadioGroup 事件

| 事件名      | 说明                     | 参数              |
| ----------- | ------------------------ | ----------------- |
| bind:change | 当绑定值变化时触发的事件 | 当前选中项的 name |

## RadioGroup 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
