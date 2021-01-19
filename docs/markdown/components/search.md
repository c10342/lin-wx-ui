# Search 搜索

---

 <div class="demo-outer-container">
     <div class="demo-inner-container">
        <div class="demo-content">
            <img class="demo-image" src='../../componentImage/search.png' />
        </div>
     </div>
 </div>

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/#/start)

```json
"usingComponents": {
  "lin-search": "/dist/Search/index"
}
```

## 基础用法

lin-search 中，`value` 用于控制搜索框中的文字。

:::demo

```html
<lin-search value="{ { value1 }}" placeholder="请输入搜索关键词" />
```

```javascript
Page({
  data: {
    value1: "",
  },
  onSearch(event) {
    console.log("search", event);
    wx.showToast({
      icon: "none",
      title: event.detail,
    });
  },
});
```

:::

## 事件监听

lin-search 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的搜索按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发

:::demo

```html
<lin-search
  value="{ { value2 }}"
  placeholder="请输入搜索关键词"
  show-action
  bind:search="onSearch"
  bind:cancel="onCancel"
/>
```

```javascript
Page({
  data: {
    value2: "",
  },
  onSearch(event) {
    console.log("search", event);
    wx.showToast({
      icon: "none",
      title: event.detail,
    });
  },
  onCancel(event) {
    wx.showToast({
      icon: "none",
      title: "取消",
    });
  },
});
```

:::

## 搜索框内容对齐

通过 `input-align` 属性可以设置搜索框内容的对齐方式

:::demo

```html
<lin-search
  value="{ { value3 }}"
  input-align="center"
  placeholder="请输入搜索关键词"
/>
```

```javascript
Page({
  data: {
    value3: "",
  },
});
```

:::

## 禁用搜索框

通过 `disabled` 属性可以将组件设置为禁用状态

:::demo

```html
<lin-search disabled value="{ { value4 }}" placeholder="请输入搜索关键词" />
```

```javascript
Page({
  data: {
    value4: "",
  },
});
```

:::

## 自定义背景色

通过`background`属性可以设置搜索框外部的背景色，通过`shape`属性设置搜索框的形状，可选值为`round`

:::demo

```html
<lin-search
  shape="round"
  background="#4fc08d"
  value="{ { value5 }}"
  placeholder="请输入搜索关键词"
/>
```

```javascript
Page({
  data: {
    value5: "",
  },
});
```

:::

## 自定义按钮

lin-search 支持自定义右侧取消按钮，使用名字为 action 的 slot，并设置 use-action-slot 为 true 即可。

:::demo

```html
<lin-search
  value="{ { value6 }}"
  label="地址"
  placeholder="请输入搜索关键词"
  use-action-slot
  bind:change="onChange"
  bind:search="onSearch"
>
  <view slot="action" bind:tap="onClick">搜索</view>
</lin-search>
```

```javascript
Page({
  data: {
    value6: "",
  },
  onSearch(event) {
    console.log("search", event);
    wx.showToast({
      icon: "none",
      title: event.detail,
    });
  },

  onChange(event) {
    console.log("change", event.detail);
  },

  onClick() {
    wx.showToast({
      title: "click",
    });
  },
});
```

:::

## 属性

| 参数             | 说明                                                               | 类型          | 可选值           | 默认值 |
| ---------------- | ------------------------------------------------------------------ | ------------- | ---------------- | ------ |
| label            | 搜索框左侧文本                                                     | String        | —                | —      |
| useLeftIconSlot  | 是否使用输入框左侧图标 slot                                        | Boolean       | —                | false  |
| useRightIconSlot | 是否使用输入框右侧图标 slot                                        | Boolean       | —                | false  |
| leftIcon         | 输入框左侧图标名称（如果设置了 use-left-icon-slot，则该属性无效）  | String        | —                | search |
| rightIcon        | 输入框右侧图标名称（如果设置了 use-right-icon-slot，则该属性无效） | String        | —                | 50rpx  |
| focus            | 获取焦点                                                           | Boolean       | —                | false  |
| value            | 当前输入的值                                                       | Number,String | —                | —      |
| disabled         | 是否禁用输入框                                                     | Boolean       | —                | false  |
| readonly         | 是否只读                                                           | Boolean       | —                | false  |
| clearable        | 是否启用清除控件                                                   | Boolean       | —                | false  |
| maxlength        | 最大输入长度，设置为 -1 的时候不限制最大长度                       | Number        | —                | -1     |
| inputAlign       | 输入框内容对齐方式                                                 | String        | —                | —      |
| placeholder      | 输入框为空时占位符                                                 | String        | —                | —      |
| placeholderStyle | 指定占位符的样式                                                   | String        | —                | —      |
| showAction       | 是否在搜索框右侧显示取消按钮                                       | Boolean       | —                | false  |
| useActionSlot    | 是否使用 action slot                                               | Boolean       | —                | false  |
| actionText       | 取消按钮文字                                                       | String        | —                | 取消   |
| background       | 搜索框背景色                                                       | String        | —                | —      |
| shape            | 形状                                                               | String        | `square`,`round` | square |
| name             | 在表单内提交时的标识符                                             | String        | —                | —      |

## 事件

| 事件名      | 说明               | 参数       |
| ----------- | ------------------ | ---------- |
| bind:change | 输入内容变化时触发 | 当前输入值 |
| bind:cancel | 取消搜索搜索时触发 | —          |
| bind:search | 确定搜索时触发     | 当前输入值 |
| bind:focus  | 输入框聚焦时触发   | 当前输入值 |
| bind:blur   | 输入框失焦时触发   | 当前输入值 |
| bind:clear  | 点击清空控件时触发 | 当前输入值 |

## 插槽

| 插槽名称   | 说明                                                                  |
| ---------- | --------------------------------------------------------------------- |
| label      | 自定义搜索框左侧文本                                                  |
| left-icon  | 自定义输入框左侧图标，需要在`use-left-icon-slot`为 `true` 时才会显示  |
| right-icon | 自定义输入框右侧图标，需要在`use-right-icon-slot`为 `true` 时才会显示 |
| action     | 自定义搜索框右侧按钮，需要在`use-action-slot`为 `true` 时才会显示     |

## 外部样式类

| 插槽名称     | 说明           |
| ------------ | -------------- |
| custom-class | 根节点样式类   |
| input-class  | 输入框样式类   |
| field-class  | 搜索框样式类   |
| cancel-class | 取消按钮样式类 |
