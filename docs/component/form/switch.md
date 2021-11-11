---
pageClass: component-page-class
---

# Switch 开关

---

<demo-image src='/componentImage/form/switch.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
  "lin-switch": "/dist/switch/index"
}
```

## 基础用法

通过`value`设置开关状态，可以通过`change`事件监听开关的变化

::: details 代码示例

```html
<lin-switch data-key="value1" checked="{ { value1 }}" bind:change="onChange" />
```

```javascript
Page({
  data: {
    value1: true,
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

通过`disabled`属性禁用开关

::: details 代码示例

```html
<lin-switch
  disabled
  data-key="value2"
  checked="{ { value2 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    value2: true,
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

## 加载状态

通过`loading`属性开启加载

::: details 代码示例

```html
<lin-switch
  loading
  data-key="value3"
  checked="{ { value3 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    value3: true,
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

通过`size`属性自定义开关大小

::: details 代码示例

```html
<lin-switch
  size="24px"
  data-key="value4"
  checked="{ { value4 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    value4: true,
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

通过`active-color`和`inactive-color`属性自定义开启状态和关闭状态的颜色

::: details 代码示例

```html
<lin-switch
  active-color="#07c160"
  inactive-color="#ee0a24"
  data-key="value5"
  checked="{ { value5 }}"
  bind:change="onChange"
/>
```

```javascript
Page({
  data: {
    value5: true,
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

## 异步控制

通过`active-color`和`inactive-color`属性自定义开启状态和关闭状态的颜色

::: details 代码示例

```html
<lin-switch data-key="value6" checked="{ { value6 }}" bind:change="onChange1" />
```

```javascript
Page({
  data: {
    value6: true,
  },
  onChange1(event) {
    wx.showModal({
      title: "提示",
      content: "是否切换开关？",
      success: (res) => {
        if (res.confirm) {
          const key = event.currentTarget.dataset.key;
          this.setData({
            [key]: event.detail,
          });
        }
      },
    });
  },
});
```

:::

## 搭配单元格使用

此时你需要再引入`Cell`组件。

::: details 代码示例

```html
<lin-cell border="{ {false}}" title="标题">
  <lin-switch
    size="20px"
    slot="value"
    data-key="value7"
    checked="{ { value7 }}"
    bind:change="onChange"
  />
</lin-cell>
```

```javascript
Page({
  data: {
    value7: true,
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

## 属性

| 参数          | 说明                   | 类型           | 可选值 | 默认值  |
| ------------- | ---------------------- | -------------- | ------ | ------- |
| checked       | 开关选中状态           | Boolean        | —      | false   |
| name          | 在表单内提交时的标识符 | String         | —      | —       |
| activeColor   | 打开时的背景色         | String         | —      | #1989fa |
| inactiveColor | 关闭时的背景色         | String         | —      | #fff    |
| activeValue   | 打开时的值             | any            | —      | true    |
| inactiveValue | 关闭时的值             | any            | —      | false   |
| disabled      | 是否禁用               | Boolean        | —      | false   |
| loading       | 是否为加载状态         | Boolean        | —      | false   |
| size          | 开关尺寸               | String, Number | —      | —       |

## 事件

| 事件名      | 说明             | 参数         |
| ----------- | ---------------- | ------------ |
| bind:change | 开关状态切换回调 | 是否选中开关 |

## 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
| node-class   | 圆点样式类   |
