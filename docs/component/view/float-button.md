---
pageClass: component-page-class
---

# FloatButton 悬浮按钮

---

<demo-image src='/componentImage/view/float-button.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-float-button": "/dist/float-button/index"
}
```

## 基础用法

传入一个 `btnList` 数组列表，点击组件即可显示该列表。`btnList`数据结构看下文

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell bind:click="onCellClick1" title="有图标展示" is-link />
  <lin-cell
    bind:click="onCellClick2"
    title="无图标展示"
    is-link
    border="{ { false }}"
  />
</lin-cell-group>

<lin-float-button closeOnClickMask bind:click="onClick" btnList="{ {btnList}}" />
```

```javascript
Page({
  data: {
    btnList: [
      {
        bgColor: '#16C2C2',
        icon: 'wechat',
        iconSize: '60rpx',
        text: '分享',
        fontSize: '34rpx',
        color: '#fff'
      },
      {
        bgColor: '#64B532',
        icon: 'link',
        // 名称
        text: '链接',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#fff'
      }
    ]
  },

  onClick(event) {
    const { detail } = event;
    wx.showToast({
      title: detail.text,
      icon: 'none'
    });
  },

  onCellClick1() {
    this.setData({
      btnList: [
        {
          bgColor: '#16C2C2',
          icon: 'wechat',
          iconSize: '60rpx',
          text: '分享',
          fontSize: '34rpx',
          color: '#fff'
        },
        {
          bgColor: '#64B532',
          icon: 'link',
          // 名称
          text: '链接',
          // 字体大小
          fontSize: 14,
          // 字体颜色
          color: '#fff'
        }
      ]
    });
  },

  onCellClick2() {
    this.setData({
      btnList: [
        {
          bgColor: '#16C2C2',
          text: '分享',
          color: '#fff'
        },
        {
          bgColor: '#64B532',
          // 名称
          text: '链接',
          // 字体颜色
          color: '#fff'
        }
      ]
    });
  }
});
```

:::

## 属性

| 参数             | 说明                 | 类型           | 可选值 | 默认值 |
| ---------------- | -------------------- | -------------- | ------ | ------ |
| btnList          | 悬浮按钮列表         | Array          | —      | —      |
| closeOnClickMask | 是否在点击选项后关闭 | Boolean        | —      | false  |
| mask             | 是否显示遮罩层       | Boolean        | —      | true   |
| bottom           | 悬浮按钮距离底部距离 | String, Number | —      | 80rpx  |
| right            | 悬浮按钮距离右边距离 | String, Number | —      | 80rpx  |
| zIndex           | 层级                 | Number         | —      | 100    |
| bgColor          | 背景色               | String         | —      | —      |
| useSlot          | 是否使用自定义插槽   | Boolean        | —      | false  |

## 事件

| 事件名     | 说明                   | 参数 |
| ---------- | ---------------------- | ---- |
| bind:hide  | 悬浮列表隐藏时触发     | —    |
| bind:show  | 悬浮列表显示时触发     | —    |
| bind:click | 点击悬浮列表按钮时触发 | —    |

## 插槽

| 插槽名称 | 说明                                                |
| -------- | --------------------------------------------------- |
| —        | 自定义悬浮按钮内容（不是`btnList`列表中的按钮内容） |

## 外部样式类

| 类名         | 说明               |
| ------------ | ------------------ |
| custom-class | 根节点样式类       |
| group-class  | 按钮列表容器样式类 |
| item-class   | 悬浮列表按钮样式类 |
| text-class   | 悬浮列表文本样式类 |
| button-class | 悬浮按钮样式类     |

## btnList 数据结构

| 字段名   | 说明     | 类型           | 可选值 | 默认值  |
| -------- | -------- | -------------- | ------ | ------- |
| bgColor  | 背景色   | String         | —      | #1989fa |
| icon     | 图标名称 | String         | —      | —       |
| iconSize | 图标大小 | String, Number | —      | 60rpx   |
| fontSize | 字体大小 | String, Number | —      | 34rpx   |
| color    | 字体颜色 | String         | —      | #fff    |
