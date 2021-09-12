---
pageClass: component-page-class
---

# Backtop 回到顶部

---

<demo-image src='/componentImage/navigation/backtop.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-backtop": "/dist/Backtop/index"
}
```

## 基础用法

默认滚动值大于 50 才显示出来，点击组件回到顶部

::: details 代码示例

```html
<lin-backtop />
```

:::

## 滚动到锚点

通过设置 `selector` 属性使页面滚动到指定锚点位置

::: details 代码示例

```html
<view class="view-anchor" id="viewAnchor"> 锚点位置 </view>

<lin-backtop selector="#viewAnchor" />
```

:::

## 使用插槽

通过设置 `useSlot` 属性为`true`，使用自定义插槽

::: details 代码示例

```html
<lin-backtop useSlot>
  <view class="backtop-slot">up</view>
</lin-backtop>
```

```css
.backtop-slot {
  width: 80rpx;
  line-height: 80rpx;
  color: rgb(25, 137, 250);
  text-align: center;
  background-color: rgb(242, 245, 246);
  box-shadow: rgba(0, 0, 0, 0.12) 0 0 6px;
}
```

:::

## 属性

| 参数             | 说明                       | 类型           | 可选值 | 默认值 |
| ---------------- | -------------------------- | -------------- | ------ | ------ |
| useSlot          | 是否使用自定义插槽         | Boolean        | —      | false  |
| visibilityHeight | 滚动高度达到此参数值才出现 | Number         | —      | 50     |
| scrollTop        | 回到顶部距离顶部的距离     | Number         | —      | 0      |
| selector         | 锚点                       | String         | —      | —      |
| duration         | 动画时长                   | Number         | —      | 300    |
| right            | 距离右边距离               | String, Number | —      | 40rpx  |
| bottom           | 距离底部距离               | String, Number | —      | 40rpx  |

## 事件

| 事件名        | 说明                                       | 参数 |
| ------------- | ------------------------------------------ | ---- |
| bind:success  | 滚动成功时触发                             | —    |
| bind:fail     | 滚动失败时触发                             | —    |
| bind:complete | 滚动完成时触发，不管是成功还是失败都会触发 | —    |

## 插槽

| 插槽名称 | 说明                                                           |
| -------- | -------------------------------------------------------------- |
| —        | 自定义内容                                                     |

## 外部样式类

| 类名          | 说明         |
| ------------- | ------------ |
| custom-class  | 根节点样式类 |
| container-class  | 容器样式类   |
| triangle-class | 内容样式类   |
